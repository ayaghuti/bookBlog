import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions';

class CreatePost extends Component {
  state = {
    modal: false,
    error: null,
    title: '',
    author: '',
    user: null,
    message: '',
  }
componentDidUpdate(prevProps) {
    const { error, loading } = this.props;
    // check if post is created successfully
    if(loading !== prevProps.loading) {
      if(!loading) this.props.history.push('/');
    }
    if(error !== prevProps.error) {
      // check for signup error
      if(error.id === 'CREATE_POST_FAIL') {
        this.setState({
          error: error.message.message
        })
        this.toggle();
      } else {
        this.setState({ error: null });
      }
    }
  }

  toggle = () => this.setState({ modal: !this.state.modal });
  handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, message }  = this.state;
    const newPost = {
      title,
      author,
      message,
      creator: this.props.auth.user.name,
      user: this.props.auth.user
      //
    }
    // console.log(newPost);
    this.props.createPost(newPost);
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }
  render() { 
    return (
    <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} onClick={this.toggle}>
        <ModalHeader toggle={this.toggle}>Error:</ModalHeader>
        <ModalBody>{this.state.error}</ModalBody>
      </Modal>
      <Form autoComplete="off" onSubmit={this.handleSubmit}>
        <Container>
          <h4>New Post</h4>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" id="title" placeholder="Book Title" 
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="author">Author</Label>
            <Input type="text" name="author" id="author" placeholder="Author"
              value={this.state.author}
              onChange={(e) => this.handleChange(e)}
            />          
          </FormGroup>
          <FormGroup>
            <Label for="message">About this book</Label>
            <Input type="textarea" name="message" id="message" 
              value={this.state.message}
              onChange={(e) => this.handleChange(e)}
            />          
          </FormGroup>        
          <Button type="submit" block>Add Post</Button> 
        </Container>
      </Form>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.post.loading,
  auth: state.auth,
  error: state.error
});
export default connect(mapStateToProps, { createPost })(CreatePost);
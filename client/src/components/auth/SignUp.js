import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { signUpUser } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
  state = {
    modal: false,
    message: '',
    name: '',
    email: '',
    password: ''
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if(error !== prevProps.error) {
      // check for signup error
      if(error.id === 'SIGNUP_FAIL') {
        this.setState({
          message: error.message.message
        })
        this.toggle();
      } else {
        this.setState({ message: null });
      }
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  handleSubmit = e => {
    e.preventDefault(); 
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password
    };
    this.props.signUpUser(newUser);
  }

  handleChange = e => {
    this.setState({ 
      ...this.state, 
      [e.target.name]: e.target.value });
  }

  render() { 
    if(this.props.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} onClick={this.toggle}>
        <ModalHeader toggle={this.toggle}>Error:</ModalHeader>
        <ModalBody>{this.state.message}</ModalBody>
      </Modal>
      <Form autoComplete="off" onSubmit={this.handleSubmit}>
        <Container className="mt-3">
          <h4>Sign Up</h4>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.handleChange(e) }
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.handleChange(e) }
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Password" 
              value={this.state.password}
              onChange={(e) => this.handleChange(e) }
            />
          </FormGroup>
          <Button block>Sign Up</Button> 
        </Container>
      </Form> 
      </div>     
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { signUpUser })(SignUp);
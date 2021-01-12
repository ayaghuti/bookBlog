import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/postActions';
import { useHistory } from 'react-router-dom';

const UpdatePost = () => {
  const  oldPost  = useSelector(state => state.post.toBeEdited);
  // console.log(oldPost);
  const { title, author, message, _id } = oldPost;
  const [newPost, setNewPost] = useState({
    title,
    author,
    message,
    _id
  });
  
  const dispatch = useDispatch();
  let history = useHistory();
   
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost(newPost._id, newPost));
    history.push('/');
  }

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <Container>
        <h4>Update Post</h4>
        <h5>Post ID: {newPost._id}</h5>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" placeholder="Book Title" 
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input type="text" name="author" id="author" placeholder="Author"
            value={newPost.author}
            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
          />          
        </FormGroup>
        <FormGroup>
          <Label for="message">About this book</Label>
          <Input type="textarea" name="text" id="message" 
            value={newPost.message}
            onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
          />          
        </FormGroup>        
        <Button type="submit" block>Update Post</Button> 
      </Container>
    </Form>
    );
  
}
 
export default UpdatePost;
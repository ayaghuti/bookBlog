import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardFooter, CardBody,
  CardTitle, CardSubtitle, CardText, ButtonGroup, Alert, Badge } from 'reactstrap';
import { likePost, deletePost, mountUpdate } from '../../actions/postActions';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const PostDetails = ({post}) => {
  const auth = useSelector( state => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const { title, author, message, creator } = post;
  const [error, setError] = useState(null);

  const handleLikePost = (e, id) => {
    e.preventDefault();
    if(!auth.isAuthenticated) {
      setError('Please sign in to get the most of this site!');
      setTimeout(() => setError(null), 3000);
      setTimeout(() => history.push('/signin'), 3000);
      return;
    }
    dispatch(likePost(id));
  }

  const handleEditPost = (e, post) => {
    e.preventDefault();
    if(!auth.isAuthenticated) {
      setError('Please sign in to get the most of this site!');
      setTimeout(() => setError(null), 3000);
      setTimeout(() => history.push('/signin'), 3000);
      return;
    }
    if(auth.user.name !== post.creator) {
      setError('You can modify only the posts created by you!');
      setTimeout(() => setError(null), 3000);
      return;
    }
    dispatch(mountUpdate(post));
    history.push('/update') 
  }

  const handleDeletePost = (e, id) => {
    e.preventDefault();
    if(!auth.isAuthenticated) {
      setError('Please sign in to get the most of this site!');
      setTimeout(() => setError(null), 3000);
      setTimeout(() => history.push('/signin'), 3000);
      return;
    }
    if(auth.user.name !== post.creator) {
      setError('You can remove only the posts created by you!');
      setTimeout(() => setError(null), 3000);
      return;
    }
    dispatch(deletePost(id));
  }


    return (
      <div>
        {error ? <Alert color="primary" className="mt-3">
        {error}
        </Alert> : null }
        <Card className="mb-3">
          <CardHeader>Created by: { creator }
            <p>Created at: {moment(post.date).fromNow()}</p> 
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">Book Title: { title }</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Author: { author }</CardSubtitle>
            <CardText>About this book: { message }</CardText>
          </CardBody>
          <CardFooter>
            <ButtonGroup className="pull-right">
              <Badge href="#" color="primary" onClick={(e) => handleLikePost(e, post._id)}><i className="fas fa-thumbs-up"> {post.likes.length}</i></Badge>
              <Badge href="#" onClick={ (e) => handleEditPost(e, post) }><i className="fas fa-edit"></i>edit</Badge>
              <Badge href="#" color="danger" onClick={(e) => handleDeletePost(e, post._id)}><i className="fas fa-delete"></i>Delete</Badge>
              
            </ButtonGroup>
          </CardFooter>                
        </Card>
      </div>
    )
  
}
 

export default PostDetails;
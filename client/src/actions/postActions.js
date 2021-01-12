import axios from 'axios';
import { 
  DELETE_POST, 
  FETCH_ALL, 
  CREATE, 
  UPDATE, 
  LIKE, 
  MOUNT_UPDATE,
  POSTS_LOADING
} from "./types";
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('/posts')
    .then(res => 
      dispatch({
        type: FETCH_ALL,
        payload: res.data
      }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status))
    });
}

export const createPost = (post) => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .post('/posts', post, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: CREATE,
        payload: res.data
      }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status, 'CREATE_POST_FAIL'));
    })
}

export const deletePost = (id) => (dispatch, getState) => {
  axios
    .delete(`/posts/${id}`, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: DELETE_POST,
        payload: id
      }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status))
    });
}
export const updatePost = (id, post) => (dispatch, getState) => {
  axios
  .patch(`/posts/${id}`, post, tokenConfig(getState))
  .then(res => {
      // console.log(res.data);
      dispatch({
        type: UPDATE,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status))
    });
}

export const likePost = (id, post) => (dispatch, getState) => {
  axios
    .patch(`/posts/${id}/likepost`, post, tokenConfig(getState))
    .then(res => {
        dispatch({
          type: LIKE,
          payload: res.data
        })
      })
      .catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status))
      });  
}

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  }
}

export const mountUpdate = (post) => {
  // console.log(post);
  return {
    type: MOUNT_UPDATE,
    payload: post
  }
}
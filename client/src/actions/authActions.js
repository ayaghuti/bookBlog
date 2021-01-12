import axios from 'axios';
import { 
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS
} from './types';
import { returnErrors, clearErrors } from './errorActions';

// check token & load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });

  // get token
  axios.get('/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
  })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
      type: AUTH_ERROR
      });
    });
}

// sign up user
export const signUpUser = ({ name, email, password }) => dispatch => { 
  // headers
  const config = {
    headers: {
      'content-type': 'application/json'
    }
  }

  // request body
  const body = JSON.stringify({ name, email, password });
  axios.post('/users', body, config)
    .then(res => {
      dispatch(clearErrors());
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status, 'SIGNUP_FAIL'));
      dispatch({
        type: SIGNUP_FAIL
      })
    })
}

// login user
export const signInUser = ({ email, password }) => dispatch => { 
  // headers
  const config = {
    headers: {
      'content-type': 'application/json'
    }
  }

  // request body
  const body = JSON.stringify({ email, password });
  axios.post('/auth', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

  // logout user
export const logoutUser = () => {
  console.log('user logged out');
  return {
    type: LOGOUT_SUCCESS
  }
}

// setup config/headers and token
export const tokenConfig = getState => {
  // get the token from local storage
  const token = getState().auth.token;
  // headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  // if token, add headers
  if(token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}
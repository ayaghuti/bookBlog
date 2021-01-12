import { GET_ERRORS, CLEAR_ERRORS } from './types';
// import { authError } from './authActions';

// return errors
export const returnErrors = (message, status, id = null) => {
  // if(message === AUTHENTICATION_ERROR) {
  //   authError();
  // } else {
    return {
      type: GET_ERRORS,
      payload: { message, status, id }
    };
  // }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}
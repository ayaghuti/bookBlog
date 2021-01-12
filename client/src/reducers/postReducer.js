import { 
  DELETE_POST, 
  FETCH_ALL, 
  CREATE, 
  UPDATE, 
  LIKE, 
  POSTS_LOADING,
  MOUNT_UPDATE
} from "../actions/types";

const initState = {
  posts: [],
  toBeEdited: null,
  loading: false
}

export const postReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case CREATE:
      return{
        ...state,
        posts: [...state.posts, action.payload],
        loading: false
      }
    case LIKE:
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
        toBeEdited: null
      }
    case DELETE_POST:
      return {
        ...state,
        posts : state.posts.filter(post => post._id !== action.payload)
      }
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      }
      case MOUNT_UPDATE:
        // console.log(action.payload);
        return {
          ...state,
          toBeEdited: action.payload
        }
    default:
      return state;
  }
}




import {SET_ERROR, DELETE_ERROR} from '../actions/actionTypes';
import {Error} from '../types/error';

export const initialState: Error = {
  type: '',
  title: '',
  message: '',
};

// This reducer handles updating the user state in the app
const errorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;

    case DELETE_ERROR:
      return initialState;

    default:
      return state;
  }
};

export default errorReducer;

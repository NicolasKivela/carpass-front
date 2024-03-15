import {User} from '../types/user';
import {LOG_IN, LOG_OUT, SET_STATE} from '../actions/actionTypes';

export const initialState: User = {
  user_name: '',
  first_name: '',
  last_name: '',
  token: '',
};

// This reducer handles updating the user state in the app
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return initialState;
    case SET_STATE:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

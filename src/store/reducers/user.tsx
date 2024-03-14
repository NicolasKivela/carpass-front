import {User} from '../types/user';
import {} from '../actions/actionTypes';

export const initialState: User = {};

// This reducer handles updating the user state in the app
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;

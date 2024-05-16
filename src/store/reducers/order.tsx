import {SET_ORDERS_STATE} from '../actions/actionTypes';

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ORDERS_STATE:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;

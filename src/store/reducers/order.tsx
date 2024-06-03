import {SET_CURRENT_ORDER, SET_ORDERS_STATE} from '../actions/actionTypes';

const initialState = {
  orders: [],
  currentOrder: {},
};

const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ORDERS_STATE:
      return {
        ...state,
        orders: action.payload,
      };
    case SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;

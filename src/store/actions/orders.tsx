import {BASE_PATH, PATHS, SCREENS} from '../../common/constants';
import {SET_ORDERS_STATE} from './actionTypes';
import {CreateOrder, Order} from '../types/order';

import {setError} from './error';
import {changePage} from './routing';
export const setOrdersState = (ordersData: Order[]) => {
  return {
    type: SET_ORDERS_STATE,
    payload: ordersData,
  };
};

export const fetchOrders = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(`${BASE_PATH}${PATHS.ORDER}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });
      if (response.ok) {
        const orders: {orders: Order[]} = await response.json();
        dispatch(setOrdersState(orders.orders));
      } else {
        throw Error;
      }
    } catch (err) {
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.fetchReportQuestinsTitle',
          message: 'errors.fetchReportQuestinsMessage',
        }),
      );
    }
  };
};

export const createOrder = (order: CreateOrder) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(`${BASE_PATH}${PATHS.ORDER}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        console.log('Order created');
        changePage(SCREENS.CUSTOMER_SCREEN);
      } else {
        throw Error;
      }
    } catch (err) {
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.createOrderTitle',
          message: 'errors.createOrderMessage',
        }),
      );
    }
  };
};

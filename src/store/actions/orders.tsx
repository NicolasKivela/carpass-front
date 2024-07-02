import {BASE_PATH, PATHS, SCREENS, USER_TYPE} from '../../common/constants';
import {SET_CURRENT_ORDER, SET_ORDERS_STATE} from './actionTypes';
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
        console.log(orders);
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
        if (getState().user.organization_type === USER_TYPE.INSPECTION) {
          changePage(SCREENS.INSPECTOR);
        } else {
          changePage(SCREENS.CUSTOMER_SCREEN);
        }
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

export const deleteOrder = (orderId: string) => {
  console.log(`${BASE_PATH}${PATHS.ORDER}?id=${orderId}`);
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(`${BASE_PATH}${PATHS.ORDER}?id=${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });
      console.log(response);
      if (response.ok) {
        console.log('Order deleted');
        dispatch(fetchOrders());
      } else {
        throw Error;
      }
    } catch (err) {
      console.log(err);
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.deleteOrderTitle',
          message: 'errors.deleteOrderMessage',
        }),
      );
    }
  };
};

export const setCurrentOrder = (order: Order) => {
  console.log(order, 'THIS IS ORDER SYNC');
  return {
    type: SET_CURRENT_ORDER,
    payload: order,
  };
};

export const updateOrderDeliveryDate = (order: Order) => {
  console.log('updating order', order);
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(`${BASE_PATH}${PATHS.ORDER}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: order.id,
          status: order.order_status,
          delivery_date: order.delivery_date,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
      const updatedOrder = await response.json();
      console.log('Order updated successfully', updatedOrder);

      return updatedOrder;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };
};

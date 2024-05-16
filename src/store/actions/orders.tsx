import {Navigation} from 'react-native-navigation';
import i18next from 'i18next';

import {BASE_PATH, PATHS, SCREENS} from '../../common/constants';
import {SET_ORDERS_STATE} from './actionTypes';
import {Order} from '../types/order';

import {setError} from './error';
export const setOrdersState = (ordersData: Order[]) => {
  return {
    type: SET_ORDERS_STATE,
    payload: ordersData,
  };
};

export const fetchOrders = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(
        `${BASE_PATH}${PATHS.ORDER}?language=${i18next.language}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        },
      );
      if (response.ok) {
        const orders: Order[] = await response.json();
        console.log('Fetched orders', orders);
        dispatch(setOrdersState(orders));
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

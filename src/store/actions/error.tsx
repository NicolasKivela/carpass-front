import {SET_ERROR, DELETE_ERROR} from './actionTypes';
import {Error} from '../types/error';

export const setError = (error: Error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const deleteError = () => {
  return {
    type: DELETE_ERROR,
  };
};

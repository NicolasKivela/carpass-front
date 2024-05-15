import {Navigation} from 'react-native-navigation';
import {decode} from 'base-64';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keyboard} from 'react-native';

import {BASE_PATH, LOCAL_STORAGE, PATHS, SCREENS} from '../../common/constants';
import {User} from '../types/user';
import {LOG_IN, LOG_OUT, SET_STATE} from './actionTypes';
import {setError} from './error';

global.atob = decode;

export const setUserData = (user: User) => {
  return {
    type: LOG_IN,
    payload: user,
  };
};
export const removeUserData = () => {
  return {
    type: LOG_OUT,
  };
};
export const setState = (token: string) => {
  return {
    type: SET_STATE,
    payload: token,
  };
};

export const loginUser = (username: string, password: string) => {
  return async (dispatch: any) => {
    try {
      // const response = await ApiManager.post(PATHS.LOGIN, {username, password})
      const response = await fetch(BASE_PATH + PATHS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      }); // remove later and use this from apimanager
      Keyboard.dismiss();
      if (response.ok) {
        const token = (await response.json()).authToken;
        await AsyncStorage.setItem(LOCAL_STORAGE.TOKEN, token); // for autologin in the future
        const credentials = jwtDecode(token) as {
          username: string;
          firstname: string;
          lastname: string;
          iat: string;
          exp: string;
        };

        dispatch(
          setUserData({
            user_name: credentials.username,
            first_name: credentials.firstname,
            last_name: credentials.lastname,
            token: token,
          }),
        );
        Navigation.setRoot({
          root: {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.VIEW_REPORT,
                  },
                },
              ],
            },
          },
        });
      } else if (response.status === 403) {
        dispatch(
          setError({
            type: 'Error',
            title: 'errors.authLoginTitle',
            message: 'errors.authLoginMessage',
          }),
        );
      } else {
        throw Error;
      }
    } catch (err) {
      dispatch(
        setError({
          type: 'Error',
          title: 'errors.loginTitle',
          message: 'errors.loginMessage',
        }),
      );
    }
  };
};

export const logoutUser = () => {
  // fectch logout user endpoint
  AsyncStorage.multiRemove(Object.values(LOCAL_STORAGE));
  removeUserData();
};

export const fetchUserState = () => {
  // fectch new token endpoint
  setState('newtoken');
};

import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import reportReducer from './reducers/report';
import errorReducer from './reducers/error';
import userReducer from './reducers/user';
import reportsByRegReducer from './reducers/reportsbyreg';

const appReducer = combineReducers({
  report: reportReducer,
  error: errorReducer,
  user: userReducer,
  reportbyreg: reportsByRegReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  // Removes non-serializable errors
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

type TypedDispatch = ThunkDispatch<RootState, any, any>;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

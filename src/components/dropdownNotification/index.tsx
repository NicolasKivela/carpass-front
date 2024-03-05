import React, {useEffect} from 'react';
import DropdownAlert, {
  DropdownAlertType,
  DropdownAlertData,
} from 'react-native-dropdownalert';
import timer from 'react-native-timer';

import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {deleteError} from '../../store/actions/error';
import {colors} from '../../common/styles';

import {styles} from './styles';

const INTERVAL = 5000;

const DropdownNotification: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.error);

  let alert = (_data: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);

  useEffect(() => {
    return () => {
      timer.clearTimeout('errorNotification');
      dispatch(deleteError());
    };
  }, []);

  useEffect(() => {
    if (error.message && error.title) {
      alert({
        type: DropdownAlertType.Error,
        title: error.title,
        message: error.message,
      });

      timer.setTimeout(
        'errorNotification',
        () => {
          dispatch(deleteError());
        },
        INTERVAL,
      );
    }
  }, [error]);

  return (
    <DropdownAlert
      alert={func => (alert = func)}
      dismissInterval={INTERVAL}
      onDismissAutomatic={() => dispatch(deleteError())}
      errorColor={colors.orange}
      alertViewStyle={styles.errorContainer}
      elevation={10}
      zIndex={10}
      activeStatusBarBackgroundColor={colors.orange}
      inactiveStatusBarBackgroundColor={colors.black}
    />
  );
};

export default DropdownNotification;

import React, {useRef, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import DropdownAlert, {
  DropdownAlertType,
  DropdownAlertData,
} from 'react-native-dropdownalert';
import timer from 'react-native-timer';

import {useAppDispatch, useAppSelector} from '../../store/configureStore';

import {colors} from '../../common/styles';

import styles from './styles';

interface Props {}

const DropdownNotification: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.errors.error); //TODO add

  const alert = useRef(
    (_data: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
  );

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    return () => {
      timer.clearTimeout('errorNotification');
    };
  }, []);

  useEffect(() => {
    setShowError(true);
    alert.current({
      type: DropdownAlertType.Error,
      title: error.title,
      message: error.message,
    });
    timer.setTimeout(
      'errorNotification',
      () => {
        setShowError(false);
        dispatch(deleteError());
      },
      5000,
    );
  }, [error]);

  // const renderMessage = () => {
  //   return (
  //     <View>
  //       <Text style={styles.errorText}>{alert.current}</Text>
  //     </View>
  //   );
  // };

  return (
    <DropdownAlert
      alert={func => (alert.current = func)}
      onDismissAutomatic={() => dispatch(deleteError())} //TODO
      elevation={10}
      zIndex={10}
      activeStatusBarBackgroundColor={colors.orange}
      //renderMessage={renderMessage}
    />
  );
};

export default DropdownNotification;

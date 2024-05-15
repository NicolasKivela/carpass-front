import React, {useRef, useState} from 'react';
import {Text} from 'react-native-paper';
import {Portal, Modal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

import {colors} from '../../common/styles';
import {SecondaryButton, TextField} from '../../components/index';
import {useAppDispatch} from '../../store/configureStore';
import {loginUser} from '../../store/actions/user';

import styles from '../styles';
import {TextFieldRef} from "../../components/TextField";
import {ButtonRef} from "../../components/SecondaryButton";

interface ModalContentProps {
  visible: boolean;
  onDismiss: () => void;
}

const LoginModal: React.FC<ModalContentProps> = ({visible, onDismiss}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const passwordFieldRef = useRef<TextFieldRef|null>(null);
  const submitRef = useRef<ButtonRef|null>(null);


  if (!visible) {
    return null;
  }

  const loginHandler = () => {
    dispatch(loginUser(username, password));
  };

  return (
    <Portal>
      <Modal
        theme={{
          colors: {
            backdrop: 'transparent',
          },
        }}
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}>
        <MaterialIcons
          name="info-outline"
          size={30}
          color={colors.orange}
          style={styles.iconStyle}
        />
        <Text style={styles.textStyle}>{t('loginToApp')}</Text>
        <TextField
          style={styles.inputStyle}
          label={t('username')}
          onChangeText={text => setUsername(text)}
          value={username}
          rightIcon="keyboard"
          onSubmit={() => passwordFieldRef?.current?.focus()}
        />
        <TextField
          style={styles.inputStyle}
          label={t('password')}
          onChangeText={text => setPassword(text)}
          value={password}
          rightIcon="password"
          secureTextEntry
          ref={passwordFieldRef}
          onSubmit={() => submitRef?.current?.click()}
        />
        <SecondaryButton
          title={t('login')}
          onPress={loginHandler}
          fontSize={16}
          style={styles.btnStyle}
          ref={submitRef}
        />
      </Modal>
    </Portal>
  );
};

export default LoginModal;

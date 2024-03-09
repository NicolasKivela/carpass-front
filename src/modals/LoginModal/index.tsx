import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {Portal, Modal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';

import {colors} from '../../common/styles';
import {SCREENS} from '../../common/constants';
import {SecondaryButton, TextField} from '../../components/index';
import styles from '../styles';

interface ModalContentProps {
  visible: boolean;
  onDismiss: () => void;
}

const LoginModal: React.FC<ModalContentProps> = ({visible, onDismiss}) => {
  const {t} = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!visible) {
    return null;
  }

  const loginHandler = () => {
    //TODO: dispatch login and if success then navigate and if not show error
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.INSPECTOR,
              },
            },
          ],
        },
      },
    });
  };

  return (
    <Portal>
      <Modal
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
        />
        <TextField
          style={styles.inputStyle}
          label={t('password')}
          onChangeText={text => setPassword(text)}
          value={password}
          rightIcon="password"
        />
        <SecondaryButton
          title={t('login')}
          onPress={loginHandler}
          fontSize={16}
          style={styles.btnStyle}
        />
      </Modal>
    </Portal>
  );
};

export default LoginModal;

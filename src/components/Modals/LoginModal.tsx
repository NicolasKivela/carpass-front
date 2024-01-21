import React from 'react';
import {Text} from 'react-native-paper';
import {Portal, Modal, Button, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {colors} from '../../common/styles';
import modalStyles from '../../common/modalStyles';

interface ModalContentProps {
  visible: boolean;
  onDismiss: () => void;
}

const LoginModal: React.FC<ModalContentProps> = ({visible, onDismiss}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {t} = useTranslation();

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={modalStyles.modal}>
        <MaterialIcons
          name="info-outline"
          size={30}
          color={colors.orange}
          style={{top: 10, bottom: 20}}
        />
        <Text
          style={{
            position: 'relative',
            top: 20,
            padding: 20,
            color: 'white',
          }}>
          {t('login')}
        </Text>
        <TextInput
          label={t('username')}
          value={username}
          textColor="white"
          onChangeText={username => setUsername(username)}
          mode="outlined"
          right={<TextInput.Icon icon="keyboard-outline" />}
          activeOutlineColor={colors.midGrey}
          style={{
            backgroundColor: colors.darkGrey,
          }}
        />
        <TextInput
          label={t('password')}
          secureTextEntry
          value={password}
          textColor="white"
          onChangeText={password => setPassword(password)}
          mode="outlined"
          right={<TextInput.Icon icon="keyboard-outline" />}
          activeOutlineColor={colors.midGrey}
          style={{
            backgroundColor: colors.darkGrey,
          }}
        />
        <Button
          mode="text"
          onPress={() =>
            console.log('username: ', username, '\n password: ', password)
          }>
          <Text style={{color: colors.midGrey}}>{t('login')}</Text>
        </Button>
      </Modal>
    </Portal>
  );
};

export default LoginModal;

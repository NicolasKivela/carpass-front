import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import {Portal, Modal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

import {colors} from '../../common/styles';
import {SecondaryButton, TextField} from '../../components/index';
import styles from '../styles';

interface ModalContentProps {
  visible: boolean;
  onDismiss: () => void;
}

const SearchModal: React.FC<ModalContentProps> = ({visible, onDismiss}) => {
  const {t} = useTranslation();

  const [search, setSearch] = useState('');

  if (!visible) {
    return null;
  }

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
        <Text style={styles.textStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          consequat odio ornare luctus feugiat. Curabitur ut metus interdum,
          laoreet dui.
        </Text>
        <TextField
          style={styles.inputStyle}
          label={t('password')}
          onChangeText={password => setSearch(password)}
          value={search}
          rightIcon="keyboard"
        />
        <SecondaryButton
          style={styles.btnStyle}
          onPress={() => console.log('query: ', search)}
          title={t('login')}
          fontSize={16}
        />
      </Modal>
    </Portal>
  );
};

export default SearchModal;

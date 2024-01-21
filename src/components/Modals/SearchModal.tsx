import React from 'react';
import {Icon, Text} from 'react-native-paper';
import {Portal, Modal, Button, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {colors} from '../../common/styles';
import modalStyles from '../../common/modalStyles';

interface ModalContentProps {
  visible: boolean;
  onDismiss: () => void;
}

const SearchModal: React.FC<ModalContentProps> = ({visible, onDismiss}) => {
  const [search, setSearch] = React.useState('');
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          consequat odio ornare luctus feugiat. Curabitur ut metus interdum,
          laoreet dui.
        </Text>
        <TextInput
          label={t('password')}
          value={search}
          textColor="white"
          onChangeText={password => setSearch(password)}
          mode="outlined"
          right={<TextInput.Icon icon="keyboard-outline" />}
          activeOutlineColor={colors.midGrey}
          style={{
            backgroundColor: colors.darkGrey,
          }}
        />
        <Button mode="text" onPress={() => console.log('query: ', search)}>
          <Text style={{color: colors.midGrey}}>{t('login')}</Text>
        </Button>
      </Modal>
    </Portal>
  );
};

export default SearchModal;

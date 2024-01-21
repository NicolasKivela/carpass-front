import React from 'react';
import {PaperProvider, Text} from 'react-native-paper';
import {Portal, Modal, Button, Checkbox} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useTranslation} from 'react-i18next';
import {colors} from '../../common/styles';
import modalStyles from '../../common/modalStyles';

interface ModalContentProps {
  visible: boolean;
  onDismiss: () => void;
}

const TOSModal: React.FC<ModalContentProps> = ({visible, onDismiss}) => {
  const [checked, setChecked] = React.useState(false);
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

        <Checkbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          color="white"
        />

        <Button mode="text" onPress={() => console.log('checked: ', checked)}>
          <Text style={{color: colors.midGrey}}>{t('login')}</Text>
        </Button>
      </Modal>
    </Portal>
  );
};

export default TOSModal;

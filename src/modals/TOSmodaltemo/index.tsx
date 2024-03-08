import React from 'react';
import {Text} from 'react-native-paper';
import {Portal, Modal, Checkbox} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useTranslation} from 'react-i18next';
import {colors} from '../../../common/styles';
import styles from '../styles';
import SecondaryButton from '../../secondaryButton';

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

        <Checkbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          color="white"
        />

        <SecondaryButton
          style={styles.btnStyle}
          onPress={() => console.log('checked: ', checked)}
          title={t('login')}
          fontSize={16}
        />
      </Modal>
    </Portal>
  );
};

export default TOSModal;

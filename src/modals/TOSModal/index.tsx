import React, {useState} from 'react';
import {View} from 'react-native';
import {Portal, Modal, Checkbox, Text, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

import {colors} from '../../common/styles';
import {SecondaryButton} from '../../components';
import styles from '../styles';
import TOSWebViewModal from '../TOSWebViewModal';

interface ModalContentProps {
  visible: boolean;
  onDismiss: () => void;
}

const TOSModal: React.FC<ModalContentProps> = ({visible, onDismiss}) => {
  const [checked, setChecked] = useState(false);
  const [TOSVisible, setTOS] = useState(false);
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
        <Text style={styles.textStyle}>Please read Terms of Service</Text>
        <Button onPress={() => setTOS(true)}>{t('TOS')}</Button>
        <TOSWebViewModal onDismiss={() => setTOS(false)} visible={TOSVisible} />
        <View style={styles.checkbox}>
          <Checkbox.Item
            label={t('I have read and accept')}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            color={colors.white}
          />
        </View>

        <SecondaryButton
          style={styles.btnStyle}
          onPress={() => {
            console.log(checked);
            onDismiss();
          }}
          title={t('continue')}
          fontSize={16}
        />
      </Modal>
    </Portal>
  );
};

export default TOSModal;

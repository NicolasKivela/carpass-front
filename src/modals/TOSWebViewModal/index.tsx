import React from 'react';
import {Portal, Modal, IconButton} from 'react-native-paper';
import Pdf from 'react-native-pdf';

import styles from './styles';
import {LINKS} from '../../common/constants';

interface ModalContentProps {
  visible: boolean;
  onDismiss: () => void;
}

const TOSWebViewModal: React.FC<ModalContentProps> = ({visible, onDismiss}) => {
  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}>
        <Pdf
          source={{uri: LINKS.TOS}}
          style={styles.webView}
          trustAllCerts={false} // This should be removed when server has ssl certificate
          onError={error => {
            console.error(error);
          }}
        />

        <IconButton style={styles.button} icon="clear" onPress={onDismiss} />
      </Modal>
    </Portal>
  );
};

export default TOSWebViewModal;

import React, {useState} from 'react';
import {Portal, Modal, IconButton} from 'react-native-paper';
import {WebView} from 'react-native-webview';

import styles from './styles';

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
        <WebView
          source={{uri: 'https://reactnative.dev/'}} //Change to TOS
          style={styles.webView}
        />
        <IconButton style={styles.button} icon="clear" onPress={onDismiss} />
      </Modal>
    </Portal>
  );
};

export default TOSWebViewModal;

import React from 'react';
import {Image, ImageBackground} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {Portal, Modal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import SecondaryButton from '../secondaryButton';
interface imageProps {
  visible: boolean;
  onDismiss: () => void;
  uri: string;
}

const ImageFull: React.FC<imageProps> = ({visible, onDismiss, uri}) => {
  const {t} = useTranslation();

  const CropImage = () => {
    ImagePicker.openCropper({
      path: uri,
      width: 300,
      height: 400,
      mediaType: 'photo',
    }).then(image => {
      console.log(image);
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}>
        <ImageBackground style={styles.background} source={{uri: uri}}>
          <SecondaryButton title="emt" onPress={CropImage}></SecondaryButton>
        </ImageBackground>
      </Modal>
    </Portal>
  );
};

export default ImageFull;

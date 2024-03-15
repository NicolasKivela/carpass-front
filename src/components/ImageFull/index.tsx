import React, {useState, useEffect, FC} from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {Portal, Modal, IconButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './styles';
import SecondaryButton from '../secondaryButton';

interface ImageProps {
  visible: boolean;
  uri: string;
  timestamp: string;
  onDismiss: () => void;
  onDelete: () => void;
  onChange: (path: string) => void;
}

const ImageFull: FC<ImageProps> = ({
  visible,
  uri,
  timestamp,
  onDismiss,
  onChange,
  onDelete,
}) => {
  const {t} = useTranslation();
  const [image, setImage] = useState(uri);

  useEffect(() => {
    setImage(uri);
  }, [uri]);

  const cropImage = () => {
    ImagePicker.openCropper({
      path: image,
      width: 300,
      height: 400,
      mediaType: 'photo',
    }).then(image => {
      setImage(image.path);
      onChange(image.path);
    });
  };
  const date = new Date(
    timestamp != '' ? parseInt(timestamp, 10) : 0,
  ).toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  if (!visible || image == '') {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}>
        <View style={styles.topBar}>
          <Text>{date}</Text>
        </View>
        <ImageBackground style={styles.background} source={{uri: image}}>
          <View style={styles.bottomBar}>
            <IconButton icon="delete" onPress={onDelete} />
            <IconButton icon="crop" onPress={cropImage} />
            <IconButton icon="check" onPress={onDismiss} />
          </View>
        </ImageBackground>
      </Modal>
    </Portal>
  );
};

export default ImageFull;

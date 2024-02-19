import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {Portal, Modal, IconButton} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import SecondaryButton from '../secondaryButton';
interface imageProps {
  visible: boolean;
  uri: string;
  onDismiss: () => void;
  onDelete: () => void;
  onChange: (path: string) => void;
}

const ImageFull: React.FC<imageProps> = ({
  visible,
  uri,
  onDismiss,
  onChange,
  onDelete,
}) => {
  const {t} = useTranslation();
  const [image, setImage] = React.useState(uri);

  React.useEffect(() => {
    setImage(uri);
  }, [uri]);

  const CropImage = () => {
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
          <Text>moi</Text>
        </View>
        <ImageBackground style={styles.background} source={{uri: image}}>
          <View style={styles.bottomBar}>
            <IconButton icon="delete" onPress={onDelete} />
            <IconButton icon="crop" onPress={CropImage} />
            <IconButton icon="check" onPress={onDismiss} />
          </View>
        </ImageBackground>
      </Modal>
    </Portal>
  );
};

export default ImageFull;

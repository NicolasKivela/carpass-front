import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import styles from './styles';
import {colors} from '../../common/styles';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import ImageFull from '../imageFull';

type Picture = {
  id: number;
  uri?: string;
};

/* Some sort of dialog needed if user should be able to choose between camera or gallery.
  Here are react native paper recommended Bottom sheets https://callstack.github.io/react-native-paper/docs/guides/recommended-libraries
  launchCamera for camera, launchImageLibrary for gallery
*/

const PictureAddition = ({}) => {
  const [Pictures, setPictures] = useState<Picture[]>([]);
  const [imageUri, setUri] = useState('');
  const [imageVisible, setVisible] = React.useState(false);
  const showImage = (uri: string) => {
    setUri(uri);
    setVisible(true);
    console.log(imageUri);
  };
  const hideImage = () => setVisible(false);

  const {t} = useTranslation();

  const addPicture = () => {
    ImagePicker.openCamera({mediaType: 'photo'})
      .then(image => {
        const newId =
          Pictures.length > 0 ? Pictures[Pictures.length - 1].id + 1 : 1;
        const newPicture: Picture = {id: newId, uri: image.path};
        setPictures(prevPictures => [...prevPictures, newPicture]);
        console.log(newId);
      })
      .catch(e => console.log(e));
  };
  const removePicture = (id: number) => {
    setPictures(pictures => pictures.filter(icon => icon.id !== id));
  };

  return (
    <View style={styles.View}>
      <Text style={styles.textStyle}>{t('Images')}</Text>
      <IconButton
        icon="add-circle-outline"
        iconColor={colors.orange}
        onPress={addPicture}
      />
      {Pictures.map(icon => (
        <TouchableOpacity
          key={icon.id}
          onPress={() => showImage(icon.uri ? icon.uri : '')}>
          <Image style={styles.image} source={{uri: icon.uri}}></Image>
        </TouchableOpacity>
      ))}
      <ImageFull visible={imageVisible} onDismiss={hideImage} uri={imageUri} />
    </View>
  );
};

export default PictureAddition;

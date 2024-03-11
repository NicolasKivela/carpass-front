import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../../common/styles';
import styles from './styles';

type Picture = {
  id: number;
  uri?: string;
};

/* Some sort of dialog needed if user should be able to choose between camera or gallery.
  Here are react native paper recommended Bottom sheets https://callstack.github.io/react-native-paper/docs/guides/recommended-libraries
  launchCamera for camera, launchImageLibrary for gallery
*/

const PictureAddition = ({}) => {
  const [pictures, setPictures] = useState<Picture[]>([]);

  const {t} = useTranslation();

  const addPicture = () => {
    ImagePicker.openCamera({mediaType: 'photo'})
      .then(image => {
        const newId =
          pictures.length > 0 ? pictures[pictures.length - 1].id + 1 : 1;
        const newPicture: Picture = {id: newId, uri: image.path};
        setPictures(prevPictures => [...prevPictures, newPicture]);
        console.log(newId);
      })
      .catch(e => console.log(e));
  };
  const removePicture = (id: number) => {
    setPictures(prevPictures => prevPictures.filter(icon => icon.id !== id));
  };

  return (
    <View style={styles.view}>
      <Text style={styles.textStyle}>{t('images')}</Text>
      <IconButton
        icon={() => (
          <MaterialIcons
            name="add-circle-outline"
            size={25}
            color={colors.orange}
          />
        )}
        onPress={addPicture}
      />
      {pictures.map(icon => (
        <TouchableOpacity key={icon.id} onPress={() => removePicture(icon.id)}>
          <Image style={styles.image} source={{uri: icon.uri}} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PictureAddition;

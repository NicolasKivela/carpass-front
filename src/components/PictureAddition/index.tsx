import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import ImageFull from '../imageFull';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../../common/styles';
import styles from './styles';

type Picture = {
  id: number;
  uri: string | null;
  timestamp: string | null;
};

/* Some sort of dialog needed if user should be able to choose between camera or gallery.
  Here are react native paper recommended Bottom sheets https://callstack.github.io/react-native-paper/docs/guides/recommended-libraries
  launchCamera for camera, launchImageLibrary for gallery
*/

const PictureAddition = ({}) => {
<<<<<<< HEAD:src/components/pictureAddition/index.tsx
  const [Pictures, setPictures] = useState<Picture[]>([]);
  const [activePicture, setActivePicture] = useState<Picture>({
    id: 0,
    uri: null,
    timestamp: null,
  });
  const [imageUri, setUri] = useState<string | null>('');
  const [imageVisible, setVisible] = React.useState(false);
  const showImage = (picture: Picture) => {
    setUri(picture.uri);
    setVisible(true);
    console.log(imageUri);
    setActivePicture(picture);
  };
  const hideImage = () => setVisible(false);
=======
  const [pictures, setPictures] = useState<Picture[]>([]);
>>>>>>> 7ab7f2dad50c6d6544424366356c391c56e28f17:src/components/PictureAddition/index.tsx

  const {t} = useTranslation();

  const addPicture = () => {
    ImagePicker.openCamera({mediaType: 'photo'})
      .then(image => {
        const newId =
<<<<<<< HEAD:src/components/pictureAddition/index.tsx
          Pictures.length > 0 ? Pictures[Pictures.length - 1].id + 1 : 1;
        const newPicture: Picture = {
          id: newId,
          uri: image.path,
          timestamp: image.modificationDate ? image.modificationDate : null,
        };

=======
          pictures.length > 0 ? pictures[pictures.length - 1].id + 1 : 1;
        const newPicture: Picture = {id: newId, uri: image.path};
>>>>>>> 7ab7f2dad50c6d6544424366356c391c56e28f17:src/components/PictureAddition/index.tsx
        setPictures(prevPictures => [...prevPictures, newPicture]);
        console.log(newId);
        console.log(image.modificationDate);
      })
      .catch(e => console.log(e));
  };
  const changePicture = (id: number, newPath: string) => {
    setPictures(pictures =>
      pictures.map(pic => (pic.id === id ? {...pic, uri: newPath} : pic)),
    );
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
<<<<<<< HEAD:src/components/pictureAddition/index.tsx
      {Pictures.map(icon => (
        <TouchableOpacity
          key={icon.id}
          onPress={() =>
            showImage(icon ? icon : {id: 0, uri: null, timestamp: null})
          }>
          <Image
            style={styles.image}
            source={{uri: icon.uri ? icon.uri : ''}}></Image>
=======
      {pictures.map(icon => (
        <TouchableOpacity key={icon.id} onPress={() => removePicture(icon.id)}>
          <Image style={styles.image} source={{uri: icon.uri}} />
>>>>>>> 7ab7f2dad50c6d6544424366356c391c56e28f17:src/components/PictureAddition/index.tsx
        </TouchableOpacity>
      ))}
      <ImageFull
        visible={imageVisible}
        onDismiss={hideImage}
        onChange={s => changePicture(activePicture.id, s)}
        onDelete={() => {
          removePicture(activePicture.id);
          hideImage();
        }}
        uri={activePicture.uri ? activePicture.uri : ''} // may add placeholder image here
        timestamp={activePicture.timestamp ? activePicture.timestamp : ''}
      />
    </View>
  );
};

export default PictureAddition;

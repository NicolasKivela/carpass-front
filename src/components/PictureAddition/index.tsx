import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '../../common/styles';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import ImageFull from '../ImageFull';
import styles from './styles';
import {
  changeReportRowImage,
  removeReportRowImage,
  setReportRowImage,
} from '../../store/actions/report';
import {Attachment} from '../../store/types/report';

/* Some sort of dialog needed if user should be able to choose between camera or gallery.
  Here are react native paper recommended Bottom sheets https://callstack.github.io/react-native-paper/docs/guides/recommended-libraries
  launchCamera for camera, launchImageLibrary for gallery
*/

interface Props {
  id: string;
}

const PictureAddition = ({id}: Props) => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const report_rows = useAppSelector(state => state.report.report_rows);

  const [activePicture, setActivePicture] = useState<Attachment>({
    id: '',
    attachment_type: 'image',
    data: '',
  });
  const [imageVisible, setVisible] = useState(false);

  const showImage = (picture: Attachment) => {
    setVisible(true);
    setActivePicture(picture);
  };

  const addPicture = () => {
    ImagePicker.openCamera({mediaType: 'photo'})
      .then(image => {
        const newId =
          report_rows.find((item: any) => item.question_id === id)?.attachments
            .length + 1 || 0;
        dispatch(
          setReportRowImage(id, {
            id: newId.toString(),
            attachment_type: 'image',
            data: image.path,
          }),
        );
      })
      .catch(e => console.log(e));
  };

  const changePicture = (idImage: string, newPath: string) => {
    dispatch(
      changeReportRowImage(id, {
        id: idImage,
        attachment_type: 'image',
        data: newPath,
      }),
    );
  };

  const removePicture = (idImage: string) => {
    dispatch(removeReportRowImage(id, idImage));
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
      {report_rows
        .find((item: any) => item.question_id === id)
        ?.attachments?.map((attachment: any) => (
          <TouchableOpacity
            key={attachment.id}
            onPress={() =>
              showImage(
                attachment ? attachment : {id: 0, uri: null, timestamp: null},
              )
            }>
            <Image
              style={styles.image}
              source={{uri: attachment.data ? attachment.data : ''}}
            />
          </TouchableOpacity>
        ))}
      <ImageFull
        visible={imageVisible}
        onDismiss={() => setVisible(false)}
        onChange={s => changePicture(activePicture.id, s)}
        onDelete={() => {
          removePicture(activePicture.id);
          setVisible(false);
        }}
        uri={activePicture.data ? activePicture.data : ''} // may add placeholder image here
        timestamp={''}
      />
    </View>
  );
};

export default PictureAddition;

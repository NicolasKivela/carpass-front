import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {TextField, PictureAddition} from '../index';
import {setReportRowComment} from '../../store/actions/report';
import {useAppDispatch} from '../../store/configureStore';
import styles from './styles';

interface ModalContentProps {
  visible: boolean;
  id: string;
}

const Description: React.FC<ModalContentProps> = ({visible, id}) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const {t} = useTranslation();

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.view}>
      <TextField
        secureTextEntry={false}
        label={t('description')}
        onChangeText={value => {
          setText(value);
          dispatch(setReportRowComment(id, value));
        }}
        value={text}
        //rightIcon="keyboard-voice"
        //onIconPress={() => console.log('click')}
      />
      <PictureAddition id={id} />
    </View>
  );
};

export default Description;

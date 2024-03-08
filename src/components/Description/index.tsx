import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import TextField from '../textfield';
import PictureAddition from '../pictureAddition';
import styles from './styles';

interface ModalContentProps {
  visible: boolean;
}

const Description: React.FC<ModalContentProps> = ({visible}) => {
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
        onChangeText={value => setText(value)}
        value={text}
        rightIcon="microphone"
        onIconPress={() => console.log('click')}
      />
      <PictureAddition />
    </View>
  );
};

export default Description;

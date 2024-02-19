import React from 'react';
import {View} from 'react-native';

import {useTranslation} from 'react-i18next';
import styles from './styles';
import TextField from '../textfield';
import PictureAddition from '../pictureAddition';

interface ModalContentProps {
  visible: boolean;
}

const Description: React.FC<ModalContentProps> = ({visible}) => {
  const [text, setText] = React.useState('');
  const {t} = useTranslation();

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.View}>
      <TextField
        secureTextEntry={false}
        label={t('description')}
        onChangeText={text => setText(text)}
        value={text}
        rightIcon="microphone"
        onIconPress={() => console.log('click')}
      />
      <PictureAddition />
    </View>
  );
};

export default Description;

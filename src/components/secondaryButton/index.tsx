import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Button} from 'react-native-paper';

import {colors} from '../../common/styles';
import styles from './styles';

interface ButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
}

const SecondaryButton = ({
  onPress,
  title,
  icon,
  fontSize,
  style,
}: ButtonProps) => {
  return (
    <Button
      mode="text"
      icon={icon}
      onPress={onPress}
      textColor={colors.midGrey}
      labelStyle={
        fontSize ? {...styles.text, fontSize: fontSize} : {...styles.text}
      }
      style={[styles.button, style]}>
      {title}
    </Button>
  );
};

export default SecondaryButton;

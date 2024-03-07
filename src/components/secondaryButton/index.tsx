import React from 'react';
import {Button} from 'react-native-paper';
import styles from './styles';
import {colors} from '../../common/styles';
import {StyleProp, TextStyle} from 'react-native';

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

import {Button} from 'react-native-paper';
import styles from './styles';
import React from 'react';
import {colors} from '../../common/styles';
import {StyleProp, ViewStyle} from 'react-native';

interface ButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const MainButton = ({title, icon, onPress, style}: ButtonProps) => {
  return (
    <Button
      icon={icon}
      onPress={onPress}
      mode="outlined"
      style={[styles.button, style]}
      labelStyle={styles.text}
      textColor={colors.orange}>
      {title.toLocaleUpperCase()}
    </Button>
  );
};

export default MainButton;

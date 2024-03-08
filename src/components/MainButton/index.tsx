import React from 'react';
import {Button} from 'react-native-paper';
import {StyleProp, ViewStyle} from 'react-native';

import {colors} from '../../common/styles';
import styles from './styles';

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

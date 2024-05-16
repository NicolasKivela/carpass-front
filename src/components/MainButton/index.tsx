import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Button } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';

import { colors } from '../../common/styles';
import styles from './styles';
import {ButtonRef} from "../SecondaryButton";

interface ButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const MainButton = forwardRef<ButtonRef, ButtonProps>(({ title, icon, onPress, style }: ButtonProps, ref) => {
  const buttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    click: () => {
      if (buttonRef.current) {
        onPress();
      }
    },
  }));

  return (
      <Button
          ref={buttonRef}
          icon={icon}
          onPress={onPress}
          mode="outlined"
          style={[styles.button, style]}
          labelStyle={styles.text}
          textColor={colors.orange}>
        {title.toLocaleUpperCase()}
      </Button>
  );
});

export default MainButton;

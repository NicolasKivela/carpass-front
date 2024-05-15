import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Button } from 'react-native-paper';

import { colors } from '../../common/styles';
import styles from './styles';

interface ButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
}

export interface ButtonRef {
  click: () => void;
}

const SecondaryButton = forwardRef<ButtonRef, ButtonProps>(({
                                                              onPress,
                                                              title,
                                                              icon,
                                                              fontSize,
                                                              style,
                                                            }: ButtonProps, ref) => {
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
          mode="text"
          icon={icon}
          onPress={onPress}
          textColor={colors.midGrey}
          labelStyle={
            fontSize ? { ...styles.text, fontSize: fontSize } : { ...styles.text }
          }
          style={[styles.button, style]}>
        {title}
      </Button>
  );
});

export default SecondaryButton;
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';

import { colors } from '../../common/styles';
import styles from './styles';

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: string;
  onIconPress?: () => void;
  backgroundColor?: string;
  style?: StyleProp<TextStyle>;
  onSubmit?: () => void;
}

export interface TextFieldRef {
  focus: () => void;
}

const TextField = forwardRef<TextFieldRef, TextFieldProps>(({
                                                              label,
                                                              onChangeText,
                                                              value,
                                                              rightIcon,
                                                              onIconPress,
                                                              secureTextEntry,
                                                              style,
                                                              onSubmit,
                                                            }: TextFieldProps, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        (inputRef.current as any).focus();
      }
    },
  }));

  return (
      <TextInput
          ref={inputRef}
          style={[styles.textInput, style]}
          mode="outlined"
          textColor={colors.white}
          value={value}
          right={
            rightIcon ? (
                <TextInput.Icon icon={rightIcon} onPress={onIconPress} />
            ) : undefined
          }
          label={label}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          activeOutlineColor={colors.orange}
          onSubmitEditing={onSubmit}
      />
  );
});

export default TextField;

import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {TextInput} from 'react-native-paper';

import {colors} from '../../common/styles';
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
}

const TextField = ({
  label,
  onChangeText,
  value,
  rightIcon,
  onIconPress,
  secureTextEntry,
  style,
}: TextFieldProps) => {
  const keyboardTypeHandler = () => {
    switch (label) {
      case 'Left value':
      case 'Right value':
      case 'Value':
        return 'decimal-pad';
      default:
        return 'default';
    }
  };
  const inputType = keyboardTypeHandler();

  return (
    <TextInput
      style={[styles.textInput, style]}
      mode="outlined"
      textColor={colors.white}
      value={value}
      keyboardType={inputType}
      right={
        rightIcon ? (
          <TextInput.Icon icon={rightIcon} onPress={onIconPress} />
        ) : undefined
      }
      label={label}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      activeOutlineColor={colors.orange}
    />
  );
};

export default TextField;

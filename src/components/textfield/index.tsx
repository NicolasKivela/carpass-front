import React from 'react';
import {TextInput} from 'react-native-paper';
import {colors} from '../../common/styles';
import styles from './styles';
import {StyleProp, TextStyle} from 'react-native';

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: string;
  backgroundColor?: string;
  style?: StyleProp<TextStyle>;
}

const TextField = ({
  label,
  onChangeText,
  value,
  rightIcon,
  secureTextEntry,
  style,
}: TextFieldProps) => {
  return (
    <TextInput
      style={[styles.textInput, style]}
      mode="outlined"
      value={value}
      right={
        rightIcon ? (
          <TextInput.Icon
            icon={rightIcon}
            color={focused => (focused ? colors.orange : undefined)}
          />
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

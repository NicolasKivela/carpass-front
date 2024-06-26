import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {StyleProp, TextStyle, View, Text} from 'react-native';
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
  onSubmit?: () => void;
}

export interface TextFieldRef {
  focus: () => void;
}

const TextField = forwardRef<TextFieldRef, TextFieldProps>(
  (
    {
      label,
      onChangeText,
      value,
      rightIcon,
      onIconPress,
      secureTextEntry,
      style,
      onSubmit,
    }: TextFieldProps,
    ref,
  ) => {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState(value);
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          (inputRef.current as any).focus();
        }
      },
    }));
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
    const formatInput = (text: string) => {
      // Remove any non-digit characters
      text = text.replace(/\D/g, '-');
      return text;
    };
    const handleChangeText = (text: string) => {
      console.log(text, 'from input');
      const formattedText = formatInput(text);
      console.log('FORMAMTTED', formattedText);
      setInputValue(formattedText);
      console.log(inputValue);
      onChangeText(formattedText);
      //handleChangeText(text);
    };
    const inputType = keyboardTypeHandler();
    const placeholder =
      label === 'Arvioitu valmistumisaika' ? 'YYYY/MM/DD' : '';
    return (
      <TextInput
        label={label}
        ref={inputRef}
        style={[styles.textInput, style]}
        mode="outlined"
        textColor={colors.white}
        value={label === 'Arvioitu valmistumisaika' ? inputValue : value}
        keyboardType={inputType}
        right={
          rightIcon ? (
            <TextInput.Icon icon={rightIcon} onPress={onIconPress} />
          ) : undefined
        }
        onChangeText={
          label === 'Arvioitu valmistumisaika' ? handleChangeText : onChangeText
        }
        secureTextEntry={secureTextEntry}
        activeOutlineColor={colors.orange}
        onSubmitEditing={onSubmit}
        placeholder={
          label === 'Arvioitu valmistumisaika' ? placeholder : undefined
        }
      />
    );
  },
);
export default TextField;

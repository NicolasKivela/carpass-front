import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

interface RadioButtonProps {
  options: Array<{id: number, name: string}>;
  selectedOption: number|null;
  setSelectedOption: (option: number) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({options, selectedOption, setSelectedOption}) => {

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
  };

  return (
    <View>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          onPress={() => handleOptionSelect(option.id)}>
          <View style={styles.optionContainer}>
            <View style={styles.radioButton}>
              {selectedOption === option.id && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.text}>{option.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;

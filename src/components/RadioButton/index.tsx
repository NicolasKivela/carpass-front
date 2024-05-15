import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

interface RadioButtonProps {
  options: string[];
  selectedOption: string|null;
  setSelectedOption: (option: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({options, selectedOption, setSelectedOption}) => {

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOptionSelect(option)}>
          <View style={styles.optionContainer}>
            <View style={styles.radioButton}>
              {selectedOption === option && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.text}>{option}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;

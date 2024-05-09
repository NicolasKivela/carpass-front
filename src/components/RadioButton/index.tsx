import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

interface RadioButtonProps {
  options: string[];
}

const RadioButton: React.FC<RadioButtonProps> = ({options}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

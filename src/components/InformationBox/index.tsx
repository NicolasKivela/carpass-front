import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';

import TextField from '../TextField';
import {colors} from '../../common/styles';
import styles from './styles';

interface InformationBoxProps {
  title: string;
  state: string;
  inspectionType: string;
  orderDate: string;
  deliveryDate?: string | null;
  onPress?: () => void;
  btnText?: string;
}

const InformationBox: React.FC<InformationBoxProps> = ({
  title,
  state,
  inspectionType,
  orderDate,
  deliveryDate,
  onPress,
  btnText,
}) => {
  const {width, height} = Dimensions.get('window');
  const isTablet = width >= 768 && height >= 1024;
  const [text, setText] = useState<string | null>(deliveryDate);
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.topRow]}>
        <Text
          style={[styles.text, styles.topLeft, isTablet && styles.tabletText]}>
          {title}
        </Text>
        <View
          style={[
            styles.stateContainer,
            state === 'ready' && styles.readyStateBackground,
          ]}>
          <Text
            style={[
              styles.text,
              styles.topRight,
              isTablet && styles.tabletText,
            ]}>
            {state}
          </Text>
        </View>
      </View>
      <View style={[styles.row, styles.bottomRow]}>
        <Text
          style={[
            styles.text,
            styles.bottomLeft,
            isTablet && styles.tabletText,
          ]}>
          {inspectionType}
        </Text>
      </View>
      <View>
        <Text
          style={[
            styles.text,
            styles.bottomRight,
            isTablet && styles.tabletText,
          ]}>
          {'Tilattu: ' + orderDate}
        </Text>
        {deliveryDate && btnText === 'ready' ? (
          <Text
            style={[
              styles.text,
              styles.bottomRight,
              isTablet && styles.tabletText,
            ]}>
            {'Arvioitu valmistumisaika: ' + deliveryDate}
          </Text>
        ) : (
          btnText === 'start inspection' && (
            <TextField
              label="Arvioitu valmistumisaika"
              value={text}
              onChangeText={setText}
              secureTextEntry={false}
              onIconPress={() => console.log('Icon pressed')}
              backgroundColor="#f0f0f0"
              onSubmit={() => {}}
            />
          )
        )}
      </View>
      {onPress && btnText && (
        <Button mode="contained" onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{btnText}</Text>
        </Button>
      )}
    </View>
  );
};

export default InformationBox;

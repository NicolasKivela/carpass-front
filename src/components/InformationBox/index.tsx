import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {colors} from '../../common/styles';
import styles from './styles';

interface InformationBoxProps {
  title: string;
  state: string;
  inspectionType: string;
  orderDate: string;
  onPress?: () => void;
  btnText?: string;
  onDelete?: () => void;
}

const InformationBox: React.FC<InformationBoxProps> = ({
  title,
  state,
  inspectionType,
  orderDate,
  onPress,
  btnText,
  onDelete
}) => {
  const {width, height} = Dimensions.get('window');
  const isTablet = width >= 768 && height >= 1024;

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
      </View>
      {onPress && btnText && (
        <Button mode="contained" onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{btnText}</Text>
        </Button>
      )}
      {onDelete && (
        <Button mode="contained" onPress={onDelete} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </Button>
      )}
    </View>
  );
};

export default InformationBox;

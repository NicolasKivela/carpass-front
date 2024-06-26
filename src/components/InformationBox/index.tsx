import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';

import TextField from '../TextField';
import {colors} from '../../common/styles';
import styles from './styles';
import {User} from '../../store/types/user.tsx';

interface InformationBoxProps {
  title: string;
  state: string;
  inspectionType: string;
  orderDate: string;
  deliveryDate?: string | null;
  onPress?: () => void;
  btnText?: string;
  handleSubmit?: (value: string | null) => void;
}

const InformationBox: React.FC<InformationBoxProps> = ({
  title,
  state,
  inspectionType,
  orderDate,
  deliveryDate,
  onPress,
  btnText,
  handleSubmit,
}) => {
  const {width, height} = Dimensions.get('window');
  const isTablet = width >= 768 && height >= 1024;
  const [text, setText] = useState<string>(deliveryDate ?? '');
  const user = useSelector((stateUser: {user: User}) => stateUser.user);
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
        {state === 'ready' || user.organization_type === 'seller' ? (
          <Text
            style={[
              styles.text,
              styles.bottomRight,
              isTablet && styles.tabletText,
            ]}>
            {'Arvioitu valmistumisaika: ' + (deliveryDate ? deliveryDate : '')}
          </Text>
        ) : (
          btnText === 'start inspection' && (
            <TextField
              label="Arvioitu valmistumisaika"
              value={text ?? ''}
              onChangeText={setText}
              secureTextEntry={false}
              onIconPress={() => console.log('Icon pressed')}
              backgroundColor="#f0f0f0"
              onSubmit={() => {
                handleSubmit?.(text);
              }}
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

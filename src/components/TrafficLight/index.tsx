import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';

import {TABLET_WIDTH} from '../../common/constants';
import styles from './styles';

enum TrafficLightColor {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

const chipData = [
  {color: TrafficLightColor.RED, activeStyle: styles.chipRed},
  {color: TrafficLightColor.YELLOW, activeStyle: styles.chipYellow},
  {color: TrafficLightColor.GREEN, activeStyle: styles.chipGreen},
];

interface TrafficLightProps {
  section: string;
  activeColor: string;
  modifyWarning: (count: number) => void;
  modifyError: (count: number) => void;
  onStateChange: (color: TrafficLightColor | null) => void;
}

const TrafficLight: React.FC<TrafficLightProps> = ({
  section,
  activeColor,
  modifyWarning,
  modifyError,
  onStateChange,
}) => {
  const toggleColor = (color: TrafficLightColor | null) => {
    onStateChange(color as TrafficLightColor);
    if (activeColor === color) {
      onStateChange(null);
      if (color === TrafficLightColor.RED) {
        modifyError(-1);
      } else if (color === TrafficLightColor.YELLOW) {
        modifyWarning(-1);
      }
    } else {
      if (activeColor === TrafficLightColor.RED) {
        modifyError(-1);
      } else if (activeColor === TrafficLightColor.YELLOW) {
        modifyWarning(-1);
      }
      onStateChange(color);
      if (color === TrafficLightColor.RED) {
        modifyError(1);
      } else if (color === TrafficLightColor.YELLOW) {
        modifyWarning(1);
      }
    }
  };

  return (
    <View style={styles.trafficLightView}>
      <View style={styles.textStyle}>
        <Text
          style={
            Dimensions.get('window').width > TABLET_WIDTH
              ? styles.carPartTextPad
              : styles.carPartText
          }>
          {section}
        </Text>
      </View>
      <View style={styles.chipView}>
        {chipData.map(item => {
          return (
            <TouchableOpacity
              key={item.color}
              onPress={() => toggleColor(item.color)}>
              <View style={styles.touchablePadding}>
                <View
                  style={[
                    Dimensions.get('window').width > TABLET_WIDTH
                      ? styles.chipDefaultPad
                      : styles.chipDefault,
                    activeColor && activeColor === item.color
                      ? item.activeStyle
                      : null,
                  ]}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TrafficLight;

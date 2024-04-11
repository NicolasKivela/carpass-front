import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';

import styles from './styles';

enum TrafficLightColor {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

const chipData = [
  {color: TrafficLightColor.RED, activeStyle: styles.activeChip1},
  {color: TrafficLightColor.YELLOW, activeStyle: styles.activeChip2},
  {color: TrafficLightColor.GREEN, activeStyle: styles.activeChip3},
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
            Dimensions.get('window').width > 600
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
                    styles.chip,
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

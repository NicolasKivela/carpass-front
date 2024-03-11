import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Chip} from 'react-native-paper';

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
  modifyWarning: (count: number) => void;
  modifyError: (count: number) => void;
  onStateChange: (color: TrafficLightColor) => void;
}

const TrafficLight: React.FC<TrafficLightProps> = ({
  section,
  modifyWarning,
  modifyError,
  onStateChange,
}) => {
  const [activeColor, setActiveColor] = useState<TrafficLightColor | null>(
    null,
  );

  const toggleColor = (color: TrafficLightColor | null) => {
    onStateChange(color as TrafficLightColor);
    if (activeColor === color) {
      setActiveColor(null);
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
      setActiveColor(color);
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
        <Text style={styles.carPartText}>{section}</Text>
      </View>
      <View style={styles.chipView}>
        {chipData.map(item => {
          return (
            <Chip
              key={item.color}
              style={[
                styles.chip,
                activeColor === item.color ? item.activeStyle : null,
              ]}
              onPress={() =>
                toggleColor(activeColor === item.color ? null : item.color)
              }
              children={undefined}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TrafficLight;

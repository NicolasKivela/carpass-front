import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Chip} from 'react-native-paper';
import styles from './styles';

enum TrafficLightColor {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

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
        <Chip
          style={[
            styles.chip,
            activeColor === TrafficLightColor.RED ? styles.activeChip1 : null,
          ]}
          onPress={() =>
            toggleColor(
              activeColor === TrafficLightColor.RED
                ? null
                : TrafficLightColor.RED,
            )
          }
          children={undefined}
        />
        <Chip
          style={[
            styles.chip,
            activeColor === TrafficLightColor.YELLOW
              ? styles.activeChip2
              : null,
          ]}
          onPress={() =>
            toggleColor(
              activeColor === TrafficLightColor.YELLOW
                ? null
                : TrafficLightColor.YELLOW,
            )
          }
          children={undefined}
        />
        <Chip
          style={[
            styles.chip,
            activeColor === TrafficLightColor.GREEN ? styles.activeChip3 : null,
          ]}
          onPress={() =>
            toggleColor(
              activeColor === TrafficLightColor.GREEN
                ? null
                : TrafficLightColor.GREEN,
            )
          }
          children={undefined}
        />
      </View>
    </View>
  );
};

export default TrafficLight;

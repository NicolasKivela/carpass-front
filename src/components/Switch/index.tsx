import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {Switch as SwitchNative} from 'react-native-switch';

import {colors} from '../../common/styles';
import styles from './style';

interface Props {
  switchText: string;
  switchValue: boolean;
  setSwitchValue: () => void;
  switchDisabled: boolean;
  containerStyle: ViewStyle;
}

const Switch: React.FC<Props> = ({
  switchText,
  switchValue,
  setSwitchValue,
  switchDisabled,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={switchDisabled ? styles.disabledText : styles.text}>
        {switchText}
      </Text>
      <SwitchNative
        disabled={switchDisabled}
        circleSize={40}
        circleBorderWidth={0}
        backgroundActive={colors.grey}
        backgroundInactive={colors.grey}
        circleActiveColor={colors.green}
        circleInActiveColor={colors.veryLightGrey}
        activeText={''}
        inActiveText={''}
        onValueChange={setSwitchValue}
        value={switchValue}
      />
    </View>
  );
};

export default Switch;

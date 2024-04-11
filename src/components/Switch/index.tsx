import React from 'react';
import {View, Text, ViewStyle, Dimensions} from 'react-native';
import {Switch as SwitchNative} from 'react-native-switch';

import {colors} from '../../common/styles';
import {TABLET_WIDTH} from '../../common/constants';
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
        circleSize={Dimensions.get('window').width > TABLET_WIDTH ? 48 : 40}
        circleBorderWidth={0}
        backgroundActive={colors.grey}
        backgroundInactive={colors.grey}
        circleActiveColor={colors.green}
        circleInActiveColor={colors.lightGrey}
        activeText={''}
        inActiveText={''}
        onValueChange={setSwitchValue}
        value={switchValue}
      />
    </View>
  );
};

export default Switch;

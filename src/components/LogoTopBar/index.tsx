import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Logo from '../../../resources/carpass_logo.svg';
import {colors} from '../../common/styles';

interface Props {
  leftButton?: {
    text?: string;
    icon?: string;
    action: () => void;
    iconStyle?: {};
  };
  rightButton?: {
    text?: string;
    icon?: string;
    action: () => void;
    iconStyle?: {};
  };
}

const LogoTopBar: React.FC<Props> = ({leftButton, rightButton}) => {
  return (
    <View style={styles.topBarContainer}>
      <View style={styles.buttonContainer}>
        {leftButton && (
          <TopBarButton
            action={leftButton.action}
            text={leftButton.text}
            icon={leftButton.icon}
            iconStyle={leftButton.iconStyle}
          />
        )}
      </View>

      <View style={styles.headerContainer}>
        <Logo width="80%" height="80%" />
      </View>

      <View style={styles.buttonContainer}>
        {rightButton && (
          <TopBarButton
            action={rightButton.action}
            text={rightButton.text}
            icon={rightButton.icon}
            iconStyle={rightButton.iconStyle}
            rightButton
          />
        )}
      </View>
    </View>
  );
};

interface ButtonProps {
  action: () => void;
  text?: string;
  icon?: string;
  iconStyle?: {};
  rightButton?: boolean;
}

const TopBarButton: React.FC<ButtonProps> = ({
  action,
  text,
  icon,
  iconStyle,
  rightButton = false,
}) => {
  return (
    <TouchableOpacity onPress={action}>
      <View style={[styles.button, rightButton && styles.buttonReverse]}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={34}
            color={colors.orange}
            style={iconStyle}
          />
        )}
        {text && <Text style={[styles.text, styles.textColor]}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    display: 'flex',
    height: 120,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  headerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    alignItems: 'center',
  },
  textColor: {
    color: colors.orange,
  },
  button: {
    minHeight: '80%',
    flexDirection: 'row',
    paddingTop: 10,
  },
  buttonReverse: {
    flexDirection: 'row-reverse',
  },
});

export default LogoTopBar;

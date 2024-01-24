import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../common/styles';

interface Props {
  children: ReactNode;
}

const Gradient: React.FC<Props> = ({children}) => {
  return (
    <LinearGradient
      start={{x: 0.9, y: 0.25}}
      end={{x: 0.3, y: 0.5}}
      colors={[colors.grey, colors.darkGrey, colors.black]}
      style={styles.container}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default Gradient;

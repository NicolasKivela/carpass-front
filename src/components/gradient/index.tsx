import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../common/styles';
import {styles} from './styles';

interface Props {
  children: ReactNode;
}

const Gradient: React.FC<Props> = ({children}) => {
  return (
    <LinearGradient
      start={{x: 0.9, y: 0.25}}
      end={{x: 0.5, y: 0.5}}
      colors={[colors.darkGrey, colors.black]}
      style={styles.container}>
      {children}
    </LinearGradient>
  );
};



export default Gradient;

import React from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {colors} from '../../common/styles';
import styles from './styles';

interface Props {
  text: string;
}

const Spinner: React.FC<Props> = ({text}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator
        size="large"
        color={colors.orange}
        style={styles.spinner}
      />
      <Text style={styles.spinnerText}>{t(text)}</Text>
    </View>
  );
};

export default Spinner;

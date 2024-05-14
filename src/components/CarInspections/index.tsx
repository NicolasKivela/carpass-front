import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

import styles from './styles';

const CarInspections: React.FC = ({}) => {
  const {t} = useTranslation();
  console.log('called carInspections');
  const reports = {
    report1: {
      date: '12.2.2022',
      warnings: 3,
      disqualifications: 1,
    },
    report2: {
      date: '13.2.2022',
      warnings: 2,
      disqualifications: 0,
    },
    report3: {
      date: '14.2.2022',
      warnings: 5,
      disqualifications: 2,
    },
    report4: {
      date: '14.2.2022',
      warnings: 5,
      disqualifications: 2,
    },
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('carInspectionHistory')}</Text>
      {Object.keys(reports).length > 0 ? (
        Object.entries(reports).map(([key, report]) => (
          <View key={key} style={styles.innerContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.textstyle}>{report.date}</Text>
            </View>
            <View style={styles.rigthContainer}>
              <View
                style={[
                  styles.circle,
                  report.warnings > 0 ? styles.yellowBackground : null,
                ]}>
                <Text>{report.warnings > 0 ? report.warnings : null}</Text>
              </View>
              <View
                style={[
                  styles.circle,
                  report.disqualifications > 0 ? styles.redBackground : null,
                ]}>
                <Text>
                  {report.disqualifications > 0
                    ? report.disqualifications
                    : null}
                </Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textbutton}>
                  {t('open').toLocaleUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.innerContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.textstyle}>
              {t('noReviews').toLocaleUpperCase()}
            </Text>
          </View>
          <View style={styles.rigthContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textbutton}>
                {t('order').toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Text style={styles.header}>{t('summary')}</Text>
    </View>
  );
};

export default CarInspections;

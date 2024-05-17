import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';

import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {
  fetchReportByReg,
  setReportByRegInitialState,
} from '../../store/actions/report';
import {SCREENS} from '../../common/constants';
import styles from './styles';

interface carInspectionProp {
  registration_number: string;
}

const CarInspections: React.FC<carInspectionProp> = ({registration_number}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const reportsData = useAppSelector(state => state.reportbyreg.reports);

  useEffect(() => {
    dispatch(fetchReportByReg(registration_number));

    dispatch(setReportByRegInitialState());
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(fetchReportByReg(registration_number));
    }, 1000);
    return () => {
      clearTimeout(delay);
      dispatch(setReportByRegInitialState());
    };
  }, [registration_number]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('carInspectionHistory')}</Text>
      {reportsData && reportsData.length > 0 ? (
        reportsData.map((report: any, index: number) => (
          <View key={index} style={styles.innerContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.textstyle}>{report.created_at}</Text>
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

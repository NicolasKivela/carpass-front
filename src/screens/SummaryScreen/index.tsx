import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Navigation} from 'react-native-navigation';

import {
  ReviewNavigation,
  Gradient,
  DropdownNotification,
} from '../../components/index';
import {REPORT_QUESTION_STATUS, SCREENS} from '../../common/constants';
import Logo from '../../assets/images/trustcarlogo.png';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {saveReport} from '../../store/actions/report';
import {styles} from './styles';

const SummaryScreen: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const reportRows = useAppSelector(state => state.report.report_rows);
  const reportStructure = useAppSelector(
    state => state.report.report_structure,
  );

  const [showCarParts, setShowCarParts] = useState(true);
  const [showWarnings, setShowWarnings] = useState(true);

  const summaryValueHandler = id => {
    return reportStructure.map(item =>
      item.questions.map(innerItem =>
        innerItem.id === id ? Object.values(innerItem.name) : null,
      ),
    );
  };

  const goBackHandler = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: SCREENS.REVIEWER,
                passProps: {
                  defaultPageNumber: reportStructure.length,
                },
              },
            },
          ],
        },
      },
    });
  };

  return (
    <Gradient>
      <SafeAreaView style={styles.container}>
        <ReviewNavigation
          pageNumber={reportStructure.length}
          totalPages={reportStructure.length}
        />
        <ScrollView>
          <Text style={styles.header}>{t('summary')}</Text>
          <View style={styles.rowSection}>
            <TouchableOpacity onPress={() => setShowCarParts(!showCarParts)}>
              <View style={styles.textContainer}>
                <Text style={styles.carSectionText}>
                  {t('disqualifications')}
                </Text>
              </View>
            </TouchableOpacity>
            {showCarParts && (
              <View style={styles.carParts}>
                {reportRows.map(row => {
                  return row.inspection_status ===
                    REPORT_QUESTION_STATUS.RED ? (
                    <Text key={row.id} style={styles.error}>
                      {summaryValueHandler(row.question_id)}
                    </Text>
                  ) : null;
                })}
              </View>
            )}
          </View>

          <View style={styles.rowSection}>
            <TouchableOpacity onPress={() => setShowWarnings(!showWarnings)}>
              <View style={styles.textContainer}>
                <Text style={styles.carSectionText}>{t('warnings')}</Text>
              </View>
            </TouchableOpacity>
            {showWarnings && (
              <View style={styles.carParts}>
                {reportRows.map(row => {
                  return row.inspection_status ===
                    REPORT_QUESTION_STATUS.YELLOW ? (
                    <Text style={styles.warning}>
                      {summaryValueHandler(row.question_id)}
                    </Text>
                  ) : null;
                })}
              </View>
            )}
          </View>
          <View style={styles.rowSection}>
            <Text style={styles.carSectionText}>{t('pictures')}</Text>
            <View style={styles.imageSection}>
              <Image style={styles.image} source={Logo} />
              <Image style={styles.image} source={Logo} />
            </View>
          </View>
          <View style={styles.rowSection}>
            <View style={styles.textContainer}>
              <Text style={styles.carSectionText}>{t('report')}</Text>
            </View>
            <View style={styles.carParts}>
              <MaterialIcons name="picture-as-pdf" size={40} color="grey" />
            </View>
          </View>
          <View style={styles.centered}>
            <TouchableOpacity
              onPress={() => {
                dispatch(saveReport());
              }}>
              <Text style={styles.sendReportText}>{t('reviewReady')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={goBackHandler}>
              <Text style={styles.sendReportText}>
                {t('goBack').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <DropdownNotification />
      </SafeAreaView>
    </Gradient>
  );
};

export default SummaryScreen;

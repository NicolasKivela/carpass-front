import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Navigation} from 'react-native-navigation';
import {WebView} from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import {Modal} from 'react-native-paper';

import {
  LogoTopBar,
  Gradient,
  DropdownNotification,
} from '../../components/index';
import {REPORT_QUESTION_STATUS, SCREENS} from '../../common/constants';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../store/configureStore';
import {getReportHtml} from '../../store/actions/report';
import {styles} from './styles';

interface ViewReportScreenProps {
  report_id: number;
  register_number: number;
  formatted_date: string;
}
interface ReportRow {
  question: string;
  answer: string;
  status: string;
}
const ViewReportScreen: React.FC<ViewReportScreenProps> = ({
  report_id,
  register_number,
  formatted_date,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const reportHtml = useAppSelector(
    (state: RootState) => state.report.report_HTML,
  );
  const [currentScreen, setCurrentScreen] = useState('');
  const [reportRows, setReportRows] = useState<ReportRow[]>([]);
  const user = useAppSelector(state => state.user);
  const currentOrder = useAppSelector(state => state.order.currentOrder);
  console.log('currentOrder', currentOrder);
  console.log('user', user);
  //console.log('report HTML data', reportHtml);
  useEffect(() => {
    dispatch(getReportHtml(register_number.toString(), report_id));
  }, []);

  useEffect(() => {
    const listener = Navigation.events().registerComponentDidAppearListener(
      ({componentId, componentName}) => {
        setCurrentScreen(componentName);
      },
    );
    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    console.log('USE EFFECT PARSING');
    const listItemRegex = /<div class="list-item">(.*?)<\/div>/gs;
    const listItemMatches = reportHtml.match(listItemRegex);
    const listItems = listItemMatches
      ? listItemMatches.map((match: any) => {
          const questionRegex = /<strong class="(yellow|red)">(.*?)<\/strong>/;
          const answerRegex = /<span class="(yellow|red)">(.*?)<\/span>/;
          const questionMatch = match.match(questionRegex);
          const answerMatch = match.match(answerRegex);
          const question = questionMatch ? questionMatch[2].trim() : '';
          const answer = answerMatch ? answerMatch[2].trim() : '';
          const status = questionMatch[1];
          return {question, answer, status};
        })
      : [];
    setReportRows(listItems);
  }, []);

  const [showCarParts, setShowCarParts] = useState(true);
  const [showWarnings, setShowWarnings] = useState(true);
  const [showFullWebView, setShowFullWebView] = useState(false);

  const warningNum = reportRows.filter(
    row => row.status === REPORT_QUESTION_STATUS.YELLOW,
  ).length;
  const errorNum = reportRows.filter(
    row => row.status === REPORT_QUESTION_STATUS.RED,
  ).length;
  const goBackHandler = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name:
                  user.organization_type === 'inspection'
                    ? SCREENS.INSPECTION_ORDERS
                    : currentScreen === 'viewReportRegScreen'
                    ? SCREENS.CARREPORTS
                    : SCREENS.CUSTOMER_ORDERS, //TODO: Change to the correct screen
                // passProps: {
                //   defaultPageNumber: reportStructure.length,
                // },
              },
            },
          ],
        },
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Gradient>
        <ScrollView>
          <LogoTopBar
            leftButton={{
              icon: 'arrow-back',
              action: goBackHandler,
            }}
          />

          <View style={styles.headerSection}>
            {register_number && (
              <Text style={styles.headerText}>{register_number}</Text>
            )}

            <View style={styles.circleRow}>
              {formatted_date && (
                <Text style={styles.headerText}>{formatted_date}</Text>
              )}

              {warningNum > 0 && (
                <View
                  style={[
                    styles.circle,
                    warningNum > 0 ? styles.yellowBackground : null,
                  ]}>
                  <Text>{warningNum}</Text>
                </View>
              )}

              {errorNum > 0 && (
                <View
                  style={[
                    styles.circle,
                    errorNum > 0 ? styles.redBackground : null,
                  ]}>
                  <Text>{errorNum}</Text>
                </View>
              )}
            </View>
          </View>
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
                  return row.status === REPORT_QUESTION_STATUS.RED ? (
                    <Text style={styles.error}>{row.question}</Text>
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
                  return row.status === REPORT_QUESTION_STATUS.YELLOW ? (
                    <Text style={styles.warning}>{row.question}</Text>
                  ) : null;
                })}
              </View>
            )}
          </View>
          <View style={styles.rowSection}>
            <TouchableOpacity onPress={() => setShowFullWebView(true)}>
              <View style={styles.webViewContainer}>
                <WebView source={{html: reportHtml}} style={styles.webView} />
              </View>
            </TouchableOpacity>

            <View>
              <TouchableOpacity onPress={() => setShowFullWebView(true)}>
                <MaterialIcons name="search" size={40} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('serch')}>
                <MaterialIcons name="print" size={40} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('serch')}>
                <MaterialIcons name="mail" size={40} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Modal
          visible={showFullWebView}
          onDismiss={() => setShowFullWebView(false)}
          contentContainerStyle={styles.modal}>
          <View style={styles.webViewContainer}>
            <WebView source={{html: reportHtml}} />
          </View>
        </Modal>
        <DropdownNotification />
      </Gradient>
    </SafeAreaView>
  );
};

export default ViewReportScreen;

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Navigation} from 'react-native-navigation';
import {WebView} from 'react-native-webview';
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

const ViewReportScreen: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const reportHtml = useAppSelector(
    (state: RootState) => state.report.report_HTML,
  );

  useEffect(() => {
    dispatch(getReportHtml('ABC-123', 1)); //TODO: Change this to not be hardcoded
  });

  const reportRows = [
    {attachments: [], comment: '', inspection_status: 'green', question_id: 1},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 2},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 3},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 4},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 5},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 6},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 7},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 8},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 9},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 10},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 11},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 12},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 13},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 14},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 15},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 16},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 17},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 18},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 19},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 20},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 21},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 22},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 23},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 24},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 25},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 26},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 27},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 28},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 29},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 30},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 31},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 32},
    {attachments: [], comment: '', inspection_status: 'red', question_id: 33},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 34},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 35},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 36},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 11},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 37},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 38},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 39},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 40},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 41},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 42},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 43},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 44},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 45},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 46},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 47},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 48},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 49},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 50},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 51},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 52},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 53},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 54},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 55},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 56},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 57},
    {attachments: [], comment: '', inspection_status: 'red', question_id: 58},
    {
      attachments: [],
      comment: '',
      inspection_status: 'yellow',
      question_id: 59,
    },
    {attachments: [], comment: '', inspection_status: 'red', question_id: 60},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 61},
    {attachments: [], comment: '', inspection_status: 'red', question_id: 62},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 63},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 64},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 65},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 66},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 67},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 68},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 69},
    {
      attachments: [],
      comment: '',
      inspection_status: 'yellow',
      question_id: 70,
    },
    {
      attachments: [],
      comment: '',
      inspection_status: 'yellow',
      question_id: 71,
    },
    {attachments: [], comment: '', inspection_status: 'green', question_id: 72},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 73},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 74},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 75},
    {attachments: [], comment: '', inspection_status: 'green', question_id: 76},
  ];
  const reportStructure = [
    {
      id: 1,
      name: 'Asiapaperit ja tunnistus',
      questions: [
        {id: 1, name: 'Rekisrerikilvet'},
        {id: 2, name: 'Valmistenumero'},
        {id: 3, name: 'Katsastustiedot'},
        {id: 4, name: 'Korjauskehoitus rekisteriotteessa'},
        {id: 5, name: 'Huoltokirja'},
      ],
    },
    {
      id: 2,
      name: 'Jarrujärjestelmä ja iskunvaimennus',
      questions: [
        {id: 6, name: 'Dynamometritesti - arvot'},
        {id: 7, name: 'Etujarrut'},
        {id: 8, name: 'Takajarrut'},
        {id: 9, name: 'Käsijarru'},
        {id: 10, name: 'Iskunvaimennus'},
        {id: 11, name: 'Etuakseli'},
        {id: 12, name: 'Taka-akseli'},
      ],
    },
    {
      id: 3,
      name: 'Ympäristöpäästöt',
      questions: [
        {id: 13, name: 'Päästömittaus'},
        {id: 14, name: 'CO-Pitoisuus'},
        {id: 15, name: 'HC-pitoisuus'},
        {id: 16, name: 'Lambda-arvo'},
        {id: 17, name: 'K-arvo'},
        {id: 18, name: 'OBD-testi'},
      ],
    },
    {
      id: 4,
      name: 'Valaistus, pesulaitteet, tuulilasi, äänimerkki',
      questions: [
        {id: 19, name: 'Valaistus etu'},
        {id: 20, name: 'Ajovalot/parkit etu'},
        {id: 21, name: 'Suuntavilkut'},
        {id: 22, name: 'Hätävilkut'},
        {id: 23, name: 'Sumuvalot'},
        {id: 24, name: 'Lisävalot'},
        {id: 25, name: 'Valaistus taka'},
        {id: 26, name: 'Ajovalot/parkit taka'},
        {id: 27, name: 'Pyyhkijät etu/taka'},
        {id: 28, name: 'Tuulilasinpyyhkimet'},
        {id: 29, name: 'Takalasinpyyhin'},
        {id: 30, name: 'Lasinpesurit'},
        {id: 31, name: 'Tuulilasinpesuri'},
        {id: 32, name: 'Takalasinpesuri'},
        {id: 33, name: 'Ajovalopesuri'},
        {id: 34, name: 'Äänimerkki'},
        {id: 35, name: 'Tuulilasin kunto'},
      ],
    },
    {
      id: 5,
      name: 'Jousitus, akselisto, pohjalevy',
      questions: [
        {id: 11, name: 'Etuakseli'},
        {id: 36, name: 'Ohjausnivelistö'},
        {id: 37, name: 'Taka-akseli'},
        {id: 38, name: 'Akselituennat, pyöränlaakerit'},
        {id: 39, name: 'Jousitus'},
        {id: 40, name: 'Pakoputkisto'},
        {id: 41, name: 'Putket ja letkut'},
        {id: 42, name: 'Polttoainesäiliöt'},
        {id: 43, name: 'Pohjalevy'},
        {id: 44, name: 'Runko'},
        {id: 45, name: 'Helmakotelot'},
        {id: 46, name: 'Jarrulevyt/palat'},
      ],
    },
    {
      id: 6,
      name: 'Renkaat',
      questions: [
        {id: 47, name: 'Eturenkaat kulutuspinta vasen'},
        {id: 48, name: 'Eturenkaat kulutuspinta oikea'},
        {id: 49, name: 'Takarenkaat kulutuspinta vasen'},
        {id: 50, name: 'Takarenkaat kulutuspinta oikea'},
      ],
    },
    {
      id: 7,
      name: 'Moottori ja apulaitteet',
      questions: [
        {id: 51, name: 'Moottori, ulkoiset havainnot'},
        {id: 52, name: 'Käynnistys'},
        {id: 53, name: 'Tyhjäkäynti'},
        {id: 54, name: 'Lataus-mitattu latausjännite tyhjäkäynnillä'},
        {id: 55, name: 'Akkutesti'},
        {id: 56, name: 'Jäähdytysjärjestelmä'},
        {id: 57, name: 'Nesteen pakkaskestävyys'},
      ],
    },
    {
      id: 8,
      name: 'Sisätilat, hallintalaitteet',
      questions: [
        {id: 58, name: 'Lasit'},
        {id: 59, name: 'Peilit'},
        {id: 60, name: 'Kojetaulu'},
        {id: 61, name: 'Hallintalaitteet, mittaristo'},
        {id: 62, name: 'Merkkivalot'},
        {id: 63, name: 'Lämmitys ja huurteenpoisto'},
        {id: 64, name: 'Ilmastointi'},
        {id: 65, name: 'Sisusta'},
        {id: 66, name: 'Sisävalaistus'},
        {id: 67, name: 'Radio/Medialaitteet'},
        {id: 68, name: 'Turvavyöt'},
      ],
    },
    {
      id: 9,
      name: 'Korin yleiskunto',
      questions: [
        {id: 69, name: 'Korroosio'},
        {id: 70, name: 'Luukut ja kahvat'},
        {id: 71, name: 'Maalipinta(ei normaali kuluminen)'},
        {id: 72, name: 'Korin muut vauriot'},
      ],
    },
    {
      id: 10,
      name: 'Voimansiirto',
      questions: [
        {id: 73, name: 'Kytkimen toiminta'},
        {id: 74, name: 'Vaihteiston toiminta'},
        {id: 75, name: 'Vetopyörästö'},
      ],
    },
    {id: 11, name: 'Lyhyt koeajo', questions: [{id: 76, name: 'Koeajo'}]},
  ];
  const reportDetails = [
    {
      id: 0,
      registration_number: 'abc-123',
      production_number: 'string',
      brand_and_model: 'string',
      odometer_reading: 0,
      created_at: '2023-05-25T15:18:10.295Z',
      updated_at: '2024-11-23T15:18:10.295Z',
      modified_by_user: 0,
      organization_id: 0,
      engine_type: 'petrol',
    },
  ];

  const [showCarParts, setShowCarParts] = useState(true);
  const [showWarnings, setShowWarnings] = useState(true);
  const [showFullWebView, setShowFullWebView] = useState(false);

  const warningNum = reportRows.filter(
    row => row.inspection_status === REPORT_QUESTION_STATUS.YELLOW,
  ).length;
  const errorNum = reportRows.filter(
    row => row.inspection_status === REPORT_QUESTION_STATUS.RED,
  ).length;

  const registerNumber = reportDetails[0].registration_number
    ? reportDetails[0].registration_number
    : null;
  const dateString = reportDetails[0].updated_at
    ? reportDetails[0].updated_at
    : reportDetails[0].created_at
    ? reportDetails[0].created_at
    : '';

  const dateFormatter = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    return day + '.' + month + '.' + year;
  };

  const formattedDate = dateFormatter(dateString);

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
                name: SCREENS.LOGIN, //TODO: Change to the correct screen
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
        <ScrollView>
          <LogoTopBar
            leftButton={{
              icon: 'arrow-back',
              action: goBackHandler,
            }}
          />
          <View style={styles.rowSection}>
            <Text>{t('registerNumber')}</Text>
            {registerNumber && <Text>{registerNumber}</Text>}
          </View>
          <View style={styles.circleRow}>
            {formattedDate && <Text>{formattedDate}</Text>}

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
                    <Text key={row.question_id} style={styles.error}>
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
      </SafeAreaView>
    </Gradient>
  );
};

export default ViewReportScreen;

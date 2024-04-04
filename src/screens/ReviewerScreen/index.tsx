import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {FlatList, View, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';

import {
  TrafficLight,
  ReviewNavigation,
  Description,
  Spinner,
  DropdownNotification,
} from '../../components/index';
import {REPORT_QUESTION_STATUS, SCREENS} from '../../common/constants';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {
  fetchReportQuestions,
  setReportRowAnswer,
} from '../../store/actions/report';
import {colors} from '../../common/styles';
import styles from './styles';

interface Props {
  defaultPageNumber?: number;
}

const ReviewerScreen: React.FC<Props> = ({defaultPageNumber}) => {
  const dispatch = useAppDispatch();

  const reportStructure = useAppSelector(
    state => state.report.report_structure,
  );
  const reportRows = useAppSelector(state => state.report.report_rows);

  const [pageNumber, setPageNumber] = useState(defaultPageNumber || 1);
  const [warningNum, setWarningNum] = useState(0);
  const [errorNum, setErrorNum] = useState(0);

  useEffect(() => {
    !defaultPageNumber && dispatch(fetchReportQuestions());
  }, []);

  const modifyWarningNum = (value: number) => {
    if (warningNum === 0 && value < 0) {
      return;
    }
    setWarningNum(warningNum + value);
  };

  const modifyErrorNum = (value: number) => {
    if (errorNum === 0 && value < 0) {
      return;
    }
    setErrorNum(errorNum + value);
  };

  const setQuestionInspectionStatus = (id: string, color: string | null) => {
    dispatch(setReportRowAnswer(id, color ? color.toLowerCase() : null));
  };

  const descriptionVisibleHandler = (id: number) => {
    const status = reportRows.find(
      i => i.question_id === id,
    )?.inspection_status;
    return (
      status === REPORT_QUESTION_STATUS.RED ||
      status === REPORT_QUESTION_STATUS.YELLOW
    );
  };

  const summaryAllowedHandler = () => {
    return reportRows.some(
      item => item.question_id && item.inspection_status === null,
    );
  };

  return (
    <SafeAreaProvider>
      <ReviewNavigation
        pageNumber={pageNumber}
        totalPages={reportStructure.length || 1}
        warningNum={warningNum}
        errorNum={errorNum}
      />

      {reportStructure.length ? (
        <View style={styles.section3}>
          <Text style={styles.header}>
            {`${reportStructure[pageNumber - 1].id}. ${
              reportStructure[pageNumber - 1].name
            }`}
          </Text>

          <FlatList
            data={reportStructure[pageNumber - 1]?.questions.sort(
              (a, b) => a.id - b.id,
            )}
            extraData={[reportRows, reportStructure]}
            renderItem={({item}) => (
              <View>
                <TrafficLight
                  section={item.name}
                  activeColor={reportRows
                    .find(i => i.question_id === item.id)
                    ?.inspection_status?.toUpperCase()}
                  modifyError={modifyErrorNum}
                  modifyWarning={modifyWarningNum}
                  onStateChange={color =>
                    setQuestionInspectionStatus(item.id, color)
                  }
                />
                <Description
                  visible={descriptionVisibleHandler(item.id)}
                  id={item.id}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            ListFooterComponent={
              <FooterButtons
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={reportStructure.length}
                summaryNotAllowed={summaryAllowedHandler()}
              />
            }
          />
        </View>
      ) : (
        <Spinner text={'loadingQuestions'} />
      )}
      <DropdownNotification />
    </SafeAreaProvider>
  );
};

interface FooterProps {
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  totalPages: number;
  summaryNotAllowed: boolean;
}

const FooterButtons: React.FC<FooterProps> = ({
  pageNumber,
  setPageNumber,
  totalPages,
  summaryNotAllowed,
}) => {
  const {t} = useTranslation();

  const buttonHandler = () => {
    if (pageNumber === totalPages && !summaryNotAllowed) {
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: SCREENS.SUMMARY,
                },
              },
            ],
          },
        },
      });
    } else if (pageNumber !== totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <View>
      <View style={styles.footer}>
        {pageNumber > 1 ? (
          <Button
            mode="outlined"
            icon={'arrow-back'}
            textColor={colors.orange}
            labelStyle={styles.footerButtonLabel}
            style={styles.footerButton}
            onPress={() => setPageNumber(pageNumber - 1)}>
            {t('previous')}
          </Button>
        ) : (
          <View />
        )}
        <Button
          mode="outlined"
          icon={'arrow-forward'}
          textColor={
            pageNumber === totalPages && summaryNotAllowed
              ? colors.lightGrey
              : colors.orange
          }
          labelStyle={styles.footerButtonLabel}
          contentStyle={styles.footerButtonContentStyle}
          style={[
            styles.footerButton,
            pageNumber === totalPages &&
              summaryNotAllowed &&
              styles.footerButtonDisabled,
          ]}
          onPress={buttonHandler}>
          {pageNumber === totalPages ? t('summary') : t('next')}
        </Button>
      </View>
      {pageNumber === totalPages && summaryNotAllowed && (
        <Text style={styles.infoText}>{t('summaryInfo')}</Text>
      )}
    </View>
  );
};
export default ReviewerScreen;

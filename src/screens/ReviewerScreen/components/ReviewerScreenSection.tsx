import React, {useRef, useState, RefObject} from 'react';
import {Dimensions, FlatList, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {ReportStructureItem, ReportRow} from '../../../store/types/report';
import {Description, TrafficLight, Switch} from '../../../components';
import {REPORT_QUESTION_STATUS} from '../../../common/constants';
import {useAppDispatch, useAppSelector} from '../../../store/configureStore';
import {setReportRowAnswer} from '../../../store/actions/report';
import styles from '../styles';
import {FooterButtons} from './ReviewerScreenFooterButtons';

interface SectionProps {
  mainListRef: RefObject<FlatList>;
  structureItem: ReportStructureItem;
  modifyWarningNum: (value: number) => void;
  modifyErrorNum: (value: number) => void;
}

export const Section: React.FC<SectionProps> = ({
  mainListRef,
  structureItem,
  modifyWarningNum,
  modifyErrorNum,
}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const reportRows = useAppSelector(state => state.report.report_rows);

  const [toggleAll, setToggleAll] = useState(false);

  const toggleAllHandler = () => {
    structureItem.questions.map(({id}) =>
      dispatch(
        setReportRowAnswer(
          id,
          !toggleAll ? REPORT_QUESTION_STATUS.GREEN.toLowerCase() : null,
        ),
      ),
    );
    setToggleAll(prevState => !prevState);
  };

  const setQuestionInspectionStatus = (id: number, color: string | null) => {
    color !== null &&
      color !== REPORT_QUESTION_STATUS.GREEN &&
      setToggleAll(false);
    dispatch(setReportRowAnswer(id, color ? color.toLowerCase() : null));
  };

  const descriptionVisibleHandler = (id: number) => {
    const foundRow = reportRows.find((i: ReportRow) => i.question_id === id);
    const status = foundRow?.inspection_status;
    const type = foundRow.type;
    if (type === 'description') {
      return (
        status === REPORT_QUESTION_STATUS.RED ||
        status === REPORT_QUESTION_STATUS.YELLOW
      );
    } else {
      return true;
    }
  };

  const summaryAllowedHandler = () => {
    return reportRows.some(
      (item: ReportRow) => item.question_id && item.inspection_status === null,
    );
  };

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
      }}>
      <Text style={styles.header}>
        {`${structureItem.id}. ${structureItem.name}`}
      </Text>
      <FlatList
        removeClippedSubviews={false}
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={structureItem.questions}
        extraData={[reportRows, structureItem]}
        renderItem={({item}) => (
          <View style={styles.horizontalPadd}>
            <TrafficLight
              section={item.name}
              activeColor={reportRows
                .find((i: ReportRow) => i.question_id === item.id)
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
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <Switch
            switchText={
              !toggleAll ? t('switchReviewerNo') : t('switchReviewerYes')
            }
            switchValue={toggleAll}
            setSwitchValue={toggleAllHandler}
            switchDisabled={structureItem.questions.some(question =>
              reportRows.some(
                (item: ReportRow) =>
                  item.question_id === question.id &&
                  item.inspection_status !== null &&
                  item.inspection_status !==
                    REPORT_QUESTION_STATUS.GREEN.toLowerCase(),
              ),
            )}
            containerStyle={styles.switchContainerStyle}
          />
        }
        ListFooterComponent={
          <FooterButtons
            pageNumber={structureItem.id}
            setPageNumber={(number: number) => {
              flatListRef.current?.scrollToOffset({offset: 0, animated: true});
              mainListRef.current?.scrollToIndex({
                index: number - 1,
                animated: true,
              });
            }}
            totalPages={11}
            summaryNotAllowed={summaryAllowedHandler()}
          />
        }
      />
    </View>
  );
};

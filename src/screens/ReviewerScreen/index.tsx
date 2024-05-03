import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SafeAreaView,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  ReviewNavigation,
  Spinner,
  DropdownNotification,
} from '../../components/index';
import * as ReviewNavigationStyle from '../../components/ReviewNavigationBar/styles';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import {fetchReportQuestions} from '../../store/actions/report';
import {ReportStructureItem} from '../../store/types/report';
import {Section} from './components/ReviewerScreenSection';
import styles from './styles';

interface Props {
  defaultPageNumber?: number;
}

const ReviewerScreen: React.FC<Props> = ({defaultPageNumber}) => {
  const dispatch = useAppDispatch();

  const reportStructure = useAppSelector(
    state => state.report.report_structure,
  );

  const flatListRef = useRef<any>(null);

  const [warningNum, setWarningNum] = useState(0);
  const [errorNum, setErrorNum] = useState(0);
  const [pageNumber, setPageNumber] = useState(defaultPageNumber || 1);

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

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const ind =
      event.nativeEvent.contentOffset.x / Dimensions.get('window').width;
    const roundIndex = Math.round(ind);
    setPageNumber(roundIndex + 1);
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ReviewNavigation
          pageNumber={pageNumber}
          totalPages={reportStructure.length || 1}
          warningNum={warningNum}
          errorNum={errorNum}
        />

        {reportStructure.length ? (
          <View style={styles.section3}>
            <KeyboardAvoidingView
              style={styles.flex}
              keyboardVerticalOffset={
                ReviewNavigationStyle.default.container.height +
                ReviewNavigationStyle.default.gap.height +
                10
              }
              behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
              <FlatList
                ref={flatListRef}
                data={reportStructure}
                keyExtractor={(item: ReportStructureItem) => item.id.toString()}
                renderItem={({item}) => (
                  <Section
                    mainListRef={flatListRef}
                    structureItem={item}
                    modifyWarningNum={modifyWarningNum}
                    modifyErrorNum={modifyErrorNum}
                  />
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                initialNumToRender={1}
              />
            </KeyboardAvoidingView>
          </View>
        ) : (
          <Spinner text={'loadingQuestions'} />
        )}
        <DropdownNotification />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ReviewerScreen;

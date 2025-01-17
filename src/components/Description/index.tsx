import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {TextField, PictureAddition} from '../index';
import {
  setReportRowComment,
  setReportRowAdditionalInput,
  setReportRowLeftInput,
  setReportRowRightInput,
} from '../../store/actions/report';
import {useAppDispatch, useAppSelector} from '../../store/configureStore';
import styles from './styles';
import {ReportRow} from '../../store/types/report';

interface ModalContentProps {
  visible: boolean;
  id: number;
}

const Description: React.FC<ModalContentProps> = ({visible, id}) => {
  const dispatch = useAppDispatch();
  const report_rows = useAppSelector(state => state.report.report_rows);

  const [text, setText] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [singleNumeric, setSingleNumeric] = useState('');
  const [leftInput, setLeftInput] = useState('');
  const [rightInput, setRightInput] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    const reportRow = report_rows.find(
      (item: ReportRow) => item.question_id === id,
    );
    if (reportRow) {
      const {type, additional_input, comment, input_left, input_right} =
        reportRow;
      type && setQuestionType(type);
      // Set single numeric value if additional input exists
      additional_input && setSingleNumeric(additional_input);

      // Set text if comment exists
      comment && setText(comment);

      // Set left and right inputs

      input_left && setLeftInput(input_left);
      input_right && setRightInput(input_right);
    }
  }, []);

  if (!visible) {
    return null;
  }
  return (
    <View style={styles.view}>
      {questionType === 'description' && (
        <TextField
          secureTextEntry={false}
          label={t('description')}
          onChangeText={value => {
            setText(value);
            dispatch(setReportRowComment(id, value));
          }}
          value={text}
          //rightIcon="keyboard-voice"
          //onIconPress={() => console.log('click')}
        />
      )}
      {questionType === 'leftrightnumeric' && (
        <View style={styles.leftRight}>
          <TextField
            label={t('inputLeft')}
            style={styles.numericInput}
            onChangeText={value => {
              const leftValue = parseFloat(value);
              setLeftInput(value);
              dispatch(setReportRowLeftInput(id, leftValue));
            }}
            value={leftInput.toString()}
          />
          <TextField
            label={t('inputRight')}
            style={styles.numericInput}
            onChangeText={value => {
              const rightValue = parseFloat(value);
              setRightInput(value);

              dispatch(setReportRowRightInput(id, rightValue));
            }}
            value={rightInput.toString()}
          />
        </View>
      )}
      {questionType === 'singlenumeric' && (
        <TextField
          label={t('value')}
          style={styles.numericInput}
          onChangeText={value => {
            const numericValue = parseFloat(value);
            setSingleNumeric(value);
            dispatch(setReportRowAdditionalInput(id, numericValue));
          }}
          value={singleNumeric.toString()}
        />
      )}
      <PictureAddition id={id} />
    </View>
  );
};
export default Description;

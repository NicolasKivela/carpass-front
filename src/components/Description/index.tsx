import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {TextField, PictureAddition} from '../index';
import {
  setReportRowComment,
  setReportRowAdditionalInput,
  setReportRowLeftRightInput,
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
  const [singleNumeric, setSingleNumeric] = useState(null);
  const [leftInput, setLeftInput] = useState(null);
  const [rightInput, setRightInput] = useState(null);
  const {t} = useTranslation();

  useEffect(() => {
    const reportRow = report_rows.find(
      (item: ReportRow) => item.question_id === id,
    );
    if (reportRow) {
      const {type, additional_input, comment, input_left, input_right} =
        reportRow;
      setQuestionType(type);
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
        <View>
          <TextInput />
          <TextInput />
        </View>
      )}
      {questionType === 'singlenumeric' && <TextInput />}
      <PictureAddition id={id} />
    </View>
  );
};

export default Description;

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {TextField, PictureAddition} from '../index';
import {setReportRowComment} from '../../store/actions/report';
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
  const {t} = useTranslation();

  useEffect(() => {
    const comment = report_rows.find(
      (item: ReportRow) => item.question_id === id,
    )?.comment;
    comment && setText(comment);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.view}>
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
      <PictureAddition id={id} />
    </View>
  );
};

export default Description;

import React, {useState} from 'react';
import {ScrollView, Text, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';

import {colors} from '../../common/styles';
import LogoTopBar from '../../components/logoTopBar';
import Gradient from '../../components/gradient';
import FrameProcessorCamera from '../../components/frameProcessorCamera';
import {styles} from './styles';

const NewReportScreen: React.FC = () => {
  const {t} = useTranslation();

  const [registerNumber, setRegisterNumber] = useState<{
    value: string;
    tempValues: string[];
  }>({
    value: '',
    tempValues: [],
  });

  return (
    <Gradient>
      <SafeAreaView style={styles.container}>
        <LogoTopBar
          leftButton={{
            icon: 'arrow-back',
            action: () => console.log('TODO: navigate back'),
          }}
        />
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.text}>{t('identificationInfo')}</Text>
          <TextInput
            label={t('registrationNumber')}
            value={registerNumber.value}
            textColor={colors.orange}
            onChangeText={value => {
              setRegisterNumber({...registerNumber, value});
            }}
            mode="outlined"
            right={
              <TextInput.Icon
                icon="keyboard-outline"
                size={30}
                color={colors.orange}
                style={styles.icon}
              />
            }
            theme={{
              colors: {onSurfaceVariant: colors.orange},
            }}
            outlineColor={colors.orange}
            activeOutlineColor={colors.orange}
            style={styles.textInput}
          />

          <FrameProcessorCamera
            registerNumber={registerNumber}
            setRegisterNumber={setRegisterNumber}
          />
        </ScrollView>
      </SafeAreaView>
    </Gradient>
  );
};

export default NewReportScreen;

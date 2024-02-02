import React, {useState} from 'react';
import {ScrollView, Text, View, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TextInput, Button} from 'react-native-paper';

import {colors} from '../../common/styles';
import LogoTopBar from '../../components/LogoTopBar';
import Gradient from '../../components/Gradient';
import {styles} from './styles';

const RegistrationNumberScreen: React.FC = () => {
  const {t} = useTranslation();
  const [registerNumber, setRegisterNumber] = useState('');

  return (
    <Gradient>
      <SafeAreaView style={styles.container}>
        <LogoTopBar
          leftButton={{
            icon: 'arrow-back',
            action: () => console.log('painettu arrow back'),
          }}
        />
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.text}>{t('identificationInfo')}</Text>
          <TextInput
            label={t('registrationNumber')}
            value={registerNumber}
            textColor={colors.orange}
            onChangeText={value => setRegisterNumber(value)}
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

          <View
            style={{
              backgroundColor: colors.white,
              height: 220,
              marginVertical: '15%',
            }}>
            <Text>Add camera here</Text>
          </View>

          <View style={styles.bottomContainer}>
            <Button
              onPress={() => console.log('todo')}
              style={styles.button}
              contentStyle={styles.innerButton}>
              <View />
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Gradient>
  );
};

export default RegistrationNumberScreen;

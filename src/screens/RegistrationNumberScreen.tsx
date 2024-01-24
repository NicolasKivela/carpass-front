import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {colors} from '../common/styles';
import LogoTopBar from '../components/LogoTopBar';

const RegistrationNumberScreen: React.FC = () => {
  const {t} = useTranslation();
  const [registerNumber, setRegisterNumber] = useState('');

  return (
    <SafeAreaProvider style={styles.container}>
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
          theme={{colors: {onSurfaceVariant: colors.orange}}}
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: 'flex-start',
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 25,
  },
  textInput: {
    height: 60,
    backgroundColor: colors.black,
    fontSize: 18,
  },
  icon: {
    paddingTop: 7,
  },
  bottomContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    right: 25,
    alignItems: 'center',
  },
  button: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.veryLightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 5,
    borderColor: colors.lightGrey,
  },
});

export default RegistrationNumberScreen;

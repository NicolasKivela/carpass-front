import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {APP_NAME} from '../common/constanst';
import {colors} from '../common/styles';
import {Button, PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LoginScreen: React.FC = () => {
  const {t} = useTranslation();
  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>{APP_NAME}</Text>
        <Text style={styles.text}>{t('login')}</Text>

        <Button
          mode="outlined"
          buttonColor={colors.black}
          onPress={() => console.log('Pressed')}
          icon={props => (
            <MaterialIcons
              {...props}
              name="login"
              size={20}
              color={colors.orange}
            />
          )}>
          Press Me
        </Button>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    color: colors.orange,
    fontSize: 18,
  },
});

export default LoginScreen;

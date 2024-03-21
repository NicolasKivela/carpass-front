import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ReviewNavigation, Gradient} from '../../components/index';
import Logo from '../../assets/images/trustcarlogo.png';
import {styles} from './styles';

const SummaryScreen: React.FC = () => {
  const {t} = useTranslation();
  const [showCarParts, setShowCarParts] = useState(true);
  const [showWarnings, setShowWarnings] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(10);

  return (
    <Gradient>
      <SafeAreaView style={styles.container}>
        <ReviewNavigation pageNumber={pageNumber} totalPages={pageNumber} />

        <View>
          <Text style={styles.header}>{t('summary')}</Text>
          <View style={styles.rowSection}>
            <TouchableOpacity onPress={() => setShowCarParts(!showCarParts)}>
              <View style={styles.textContainer}>
                <Text style={styles.carSectionText}>
                  {t('disqualifications')}
                </Text>
              </View>
            </TouchableOpacity>
            {showCarParts && (
              <View style={styles.carParts}>
                <Text style={styles.error}>hallintalaitteet</Text>
                <Text style={styles.error}>hallintalaitteet</Text>
                <Text style={styles.error}>hallintalaitteet</Text>
              </View>
            )}
          </View>
          <View style={styles.rowSection}>
            <TouchableOpacity onPress={() => setShowWarnings(!showWarnings)}>
              <View style={styles.textContainer}>
                <Text style={styles.carSectionText}>{t('warnings')}</Text>
              </View>
            </TouchableOpacity>
            {showWarnings && (
              <View style={styles.carParts}>
                <Text style={styles.warning}>sisätilat</Text>
                <Text style={styles.warning}>sisätilat</Text>
                <Text style={styles.warning}>sisätilat</Text>
              </View>
            )}
          </View>
          <View style={styles.rowSection}>
            <Text style={styles.carSectionText}>{t('pictures')}</Text>
            <View style={styles.imageSection}>
              <Image style={styles.image} source={Logo} />
              <Image style={styles.image} source={Logo} />
            </View>
          </View>
          <View style={styles.rowSection}>
            <View style={styles.textContainer}>
              <Text style={styles.carSectionText}>{t('report')}</Text>
            </View>
            <View style={styles.carParts}>
              <MaterialIcons name="picture-as-pdf" size={40} color="grey" />
            </View>
          </View>
          <View style={styles.centered}>
            <TouchableOpacity
              onPress={() => {
                console.log('TODO: summary ready');
              }}>
              <Text style={styles.sendReportText}>{t('reviewReady')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Gradient>
  );
};

export default SummaryScreen;

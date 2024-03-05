import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider, MD3Colors} from 'react-native-paper';
import TrafficLight from '../../components/trafficLight';
import {ReviewProgressBar, ReviewNavigation} from '../../components/reviewNavigationbar';
import styles from './styles';
import Description from '../../components/description';

const ReviewerScreen: React.FC = () => {
  const data1 = [
    {key: '1', section: 'Ajettavuus'},
    {key: '2', section: 'Tuulilasi ja sen puhdistuslaitteet'},
    {key: '3', section: 'Lämmitys ja huurteenpoisto'},
    {key: '4', section: 'Sisätilat'},
    {key: '5', section: 'Hallintalaitteet ja merkkivalot'},
    {key: '6', section: 'Ohjauslukko'},
    {key: '7', section: 'Vaihdelukko'},
    {key: '8', section: 'Nopeusmittari'},
    {key: '9', section: 'Muut mittarit'},
  ];
  const text1 = '1. Ajettavuus, hallintalaitteet ja sisätilat';
  const { t } = useTranslation();
  const [displayData, setData] = useState(data1);
  const [displayText, setText] = useState(text1);
  const [visibleDescriptions, setVisibleDescriptions] = useState<{
    [key: string]: boolean;
  }>({});

        const [pageNumber, setPageNumber] = useState(1);
        const [warningNum, setWarningNum] = useState(0);
        const [errorNum, setErrorNum] = useState(0);

        const modifyWarningNum = (value: number) => {
          if (warningNum === 0 && value < 0) {
            return;
          }
          setWarningNum(warningNum + value);
          console.log(warningNum, 'THIS IS WARNING');
        };
        const modifyErrorNum = (value: number) => {
          if (errorNum === 0 && value < 0) {
            return;
          }
          setErrorNum(errorNum + value);
          console.log(errorNum, 'THIS IS ERROR');
        };



  const setDescriptionVisibility = (key: string, color: string) => {
    const value = color === null ? false : (color === 'GREEN' ? false : true);
    console.log(color, "===", value)
    setVisibleDescriptions(prevVisibility => ({
      ...prevVisibility,
      [key]: value,
    }));
  };

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <ReviewNavigation pageNumber={pageNumber} warningNum={warningNum} errorNum={errorNum}/>

        <View style={styles.section3}>
          <FlatList
            ListHeaderComponent={
              <Text style={styles.header}>{displayText}</Text>
            }
            data={displayData}
            renderItem={({item}) => (
              <View>
                <TrafficLight
                  section={item.section}
                  modifyError={modifyErrorNum}
                  modifyWarning={modifyWarningNum}
                  onStateChange={color =>
                    setDescriptionVisibility(item.key, color)
                  }
                />
                <Description visible={visibleDescriptions[item.key]} />
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
};
export default ReviewerScreen;

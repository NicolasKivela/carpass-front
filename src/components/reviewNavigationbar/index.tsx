import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ProgressBar, MD3Colors, Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import LogoTopBar from '../../components/logoTopBar';
import styles from './styles';
interface ProgressProps{
    progress: number,
}
const ReviewProgressBar = ({ progress}:ProgressProps) => {
  return(
  <ProgressBar progress={progress} style= {styles.navigationProgressBar} theme={{colors: styles.themeColors}} />
  )
  }


const ReviewNavigation = () => {
      const { t } = useTranslation();
      const [activeButton, setActiveButton] = useState<string | null>(null);
      const [pageNumber, setPageNumber] = useState(1);
      const [warningNum, setWarningNum] = useState(0);
      const [errorNum, setErrorNum] = useState(0);
      const handlePress = (value: string) => {
        if (activeButton === null || activeButton !== value) {
          setActiveButton(value);
        } else if (activeButton === value) {
          setActiveButton(null);
        }
      };
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

    return(
        <>
        <View style={styles.container}>
                  <View style={styles.leftView}>
                    <Image
                      source={require('../../assets/images/trustcarlogo.png')}
                      style={styles.imageStyles}
                    />
                  </View>

                  <View style={styles.rightView}>
                    <View style={styles.circleRow}>
                      {warningNum > 0 && (
                        <View
                          style={[
                            styles.circle,
                            warningNum > 0 ? {backgroundColor: 'yellow'} : null,
                          ]}>
                          <Text>{warningNum}</Text>
                        </View>
                      )}

                      {errorNum > 0 && (
                        <View
                          style={[
                            styles.circle,
                            errorNum > 0 ? {backgroundColor: 'red'} : null,
                          ]}>
                          <Text>{errorNum}</Text>
                        </View>
                      )}
                    </View>
                    <ReviewProgressBar progress={pageNumber / 10} />
                    <Text style={styles.pageNumber}>{pageNumber}/10</Text>
                  </View>
                </View>

                <View style={styles.gap}>
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => handlePress("LAAJA")}
                    activeOpacity={1}>
                    <Text
                      style={[
                        styles.buttonText,
                        activeButton === "LAAJA" && styles.activeButtonText,
                      ]}>
                      {t("full")}
                    </Text>
                    {activeButton === "LAAJA" && <View style={styles.underline} />}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => handlePress("KEVYT")}
                    activeOpacity={1}>
                    <Text
                      style={[
                        styles.buttonText,
                        activeButton === "KEVYT" && styles.activeButtonText,
                      ]}>
                      {t("lite")}
                    </Text>
                    {activeButton === "KEVYT" && <View style={styles.underline} />}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => handlePress("OSA")}
                    activeOpacity={1}>
                    <Text
                      style={[
                        styles.buttonText,
                        activeButton === "OSA" && styles.activeButtonText,
                      ]}>
                      {t("part")}
                    </Text>
                    {activeButton === "OSA" && <View style={styles.underline} />}
                  </TouchableOpacity>
                  </View>
        </>
    )
}

export {ReviewProgressBar, ReviewNavigation};
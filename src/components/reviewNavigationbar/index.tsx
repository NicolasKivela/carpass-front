import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import {colors} from '../../common/styles.tsx';
import {REPORT_TYPE} from '../../common/constants.tsx';
import styles from './styles';
interface ProgressProps {
  progress: number;
}

const ReviewProgressBar = ({progress}: ProgressProps) => {
  return (
    <ProgressBar
      progress={progress}
      style={styles.navigationProgressBar}
      theme={{
        colors: {primary: colors.orange, surfaceVariant: colors.darkOrange},
      }}
    />
  );
};

interface NavigationProps {
  warningNum?: number;
  errorNum?: number;
  pageNumber?: number;
}

const ReviewNavigation = ({
  warningNum,
  errorNum = 0,
  pageNumber = 0,
}: NavigationProps) => {
  const {t} = useTranslation();

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handlePress = (value: string) => {
    if (activeButton === null || activeButton !== value) {
      setActiveButton(value);
    } else if (activeButton === value) {
      setActiveButton(null);
    }
  };

  return (
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
            {warningNum && warningNum > 0 && (
              <View
                style={[
                  styles.circle,
                  warningNum > 0 ? styles.yellowBackground : null,
                ]}>
                <Text>{warningNum}</Text>
              </View>
            )}

            {errorNum > 0 && (
              <View
                style={[
                  styles.circle,
                  errorNum > 0 ? styles.redBackground : null,
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
          onPress={() => handlePress(REPORT_TYPE.FULL)}
          activeOpacity={1}>
          <Text
            style={[
              styles.buttonText,
              activeButton === REPORT_TYPE.FULL && styles.activeButtonText,
            ]}>
            {t('full')}
          </Text>
          {activeButton === REPORT_TYPE.FULL && (
            <View style={styles.underline} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(REPORT_TYPE.LITE)}
          activeOpacity={1}>
          <Text
            style={[
              styles.buttonText,
              activeButton === REPORT_TYPE.LITE && styles.activeButtonText,
            ]}>
            {t('lite')}
          </Text>
          {activeButton === REPORT_TYPE.LITE && (
            <View style={styles.underline} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(REPORT_TYPE.PART)}
          activeOpacity={1}>
          <Text
            style={[
              styles.buttonText,
              activeButton === REPORT_TYPE.PART && styles.activeButtonText,
            ]}>
            {t('part')}
          </Text>
          {activeButton === REPORT_TYPE.PART && (
            <View style={styles.underline} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export {ReviewProgressBar, ReviewNavigation};

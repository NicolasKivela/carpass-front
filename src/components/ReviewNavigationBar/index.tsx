import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';

import {colors} from '../../common/styles.tsx';
import {REPORT_TYPE, SCREENS} from '../../common/constants.tsx';
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
  pageNumber: number;
  totalPages: number;
}

const ReviewNavigation = ({
  warningNum = 0,
  errorNum = 0,
  pageNumber = 0,
  totalPages = 0,
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
            {warningNum > 0 && (
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
          <ReviewProgressBar progress={pageNumber / totalPages} />
          <Text style={styles.pageNumber}>
            {pageNumber}/{totalPages}
          </Text>
        </View>
      </View>

      <View style={styles.gap}>
        {[REPORT_TYPE.FULL, REPORT_TYPE.LITE, REPORT_TYPE.PART].map(item => {
          return (
            <TouchableOpacity
              key={item}
              style={styles.button}
              onPress={() => handlePress(item)}
              activeOpacity={1}>
              <Text
                style={[
                  styles.buttonText,
                  activeButton === item && styles.activeButtonText,
                ]}>
                {t(item.toLowerCase())}
              </Text>
              {activeButton === item && <View style={styles.underline} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export {ReviewProgressBar, ReviewNavigation};

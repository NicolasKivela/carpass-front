import React from 'react';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Navigation} from 'react-native-navigation';
import {View, Text} from 'react-native';

import {SCREENS} from '../../../common/constants';
import {colors} from '../../../common/styles';
import styles from '../styles';

interface FooterProps {
  pageNumber: number;
  setPageNumber: (number: number) => void;
  totalPages: number;
  summaryNotAllowed: boolean;
}

export const FooterButtons: React.FC<FooterProps> = ({
  pageNumber,
  setPageNumber,
  totalPages,
  summaryNotAllowed,
}) => {
  const {t} = useTranslation();

  const buttonHandler = () => {
    if (pageNumber === totalPages && !summaryNotAllowed) {
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: SCREENS.SUMMARY,
                },
              },
            ],
          },
        },
      });
    } else if (pageNumber !== totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <View>
      <View style={styles.footer}>
        {pageNumber > 1 ? (
          <Button
            mode="outlined"
            icon={'arrow-back'}
            textColor={colors.orange}
            labelStyle={styles.footerButtonLabel}
            style={styles.footerButton}
            onPress={() => setPageNumber(pageNumber - 1)}>
            {t('previous')}
          </Button>
        ) : (
          <View />
        )}
        <Button
          mode="outlined"
          icon={'arrow-forward'}
          textColor={
            pageNumber === totalPages && summaryNotAllowed
              ? colors.lightGrey
              : colors.orange
          }
          labelStyle={styles.footerButtonLabel}
          contentStyle={styles.footerButtonContentStyle}
          style={[
            styles.footerButton,
            pageNumber === totalPages &&
              summaryNotAllowed &&
              styles.footerButtonDisabled,
          ]}
          onPress={buttonHandler}>
          {pageNumber === totalPages ? t('summary') : t('next')}
        </Button>
      </View>
      {pageNumber === totalPages && summaryNotAllowed && (
        <Text style={styles.infoText}>{t('summaryInfo')}</Text>
      )}
    </View>
  );
};

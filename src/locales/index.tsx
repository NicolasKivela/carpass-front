import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en_translation from './en.json';
import fi_translation from './fi.json';

i18n.use(initReactI18next).init({
  lng: 'fi',
  compatibilityJSON: 'v3',
  debug: true,
  resources: {
    en: {
      translation: en_translation,
    },
    fi: {translation: fi_translation},
  },
});

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en/translation.json';
import translationFR from '../locales/fr/translation.json';

const resources = {
  en: {
    translation: translationEN, // English translations
  },
  fr: {
    translation: translationFR, // French translations
  },
};

// Initialize i18n with React integration and set up configuration.
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set the default language to English.
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

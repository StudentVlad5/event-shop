import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ua: {
        translation: require('../src/translate/ua.json'),
      },
      ru: {
        translation: require('../src//translate/ru.json'),
      },
    },
    fallbackLng: 'fr',
    debug: false,
  });

export default i18n;

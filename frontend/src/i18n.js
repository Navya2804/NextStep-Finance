// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/english.json';
import translationHI from './locales/hindi.json';
import translationMR from './locales/marathi.json';

const resources = {
  english: { translation: translationEN },
  hindi: { translation: translationHI },
  marathi: { translation: translationMR },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'english',
    interpolation: { escapeValue: false },
  });

export default i18n;
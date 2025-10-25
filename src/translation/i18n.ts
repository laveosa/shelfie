import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import engTrans from "@/translation/localizations/eng.json";
import plTrans from "@/translation/localizations/pl.json";

const resources = {
  "en-EN": {
    translation: engTrans,
  },
  "pl-PL": {
    translation: plTrans,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en-EN",
  lng: "en-EN",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
});

export default i18n;

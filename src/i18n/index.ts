import en from "./locales/en";
import uk from "./locales/uk";

export const locales = ["en", "uk"] as const;
export type Locale = (typeof locales)[number];

export type Translation = typeof en;

const translations: Record<Locale, Translation> = {
  en,
  uk,
};

export function getTranslation(locale: Locale): Translation {
  return translations[locale];
}

const AVAILABLE_LANGUAGES = {
  en: "English",
  cs: "Čeština",
} as const;

const DEFAULT_LOCALE = "en";

type Locale = keyof typeof AVAILABLE_LANGUAGES;

export function useCurrentLocale() {
  const browserLanguage = navigator.language?.split("-")[0];

  return (
    browserLanguage in AVAILABLE_LANGUAGES ? browserLanguage : DEFAULT_LOCALE
  ) as Locale;
}

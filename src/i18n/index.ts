import en, { type Copy } from "./en";
import pt from "./pt";

export type Locale = "en" | "pt";

export const copyByLocale: Record<Locale, Copy> = { en, pt };

export function getCopy(locale: Locale): Copy {
  return copyByLocale[locale];
}

export function localePath(locale: Locale): string {
  return locale === "en" ? "/" : "/pt/";
}

export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "pt-BR";
}

import 'server-only'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  sv: () => import('../dictionaries/sv.json').then((module) => module.default),
}

type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
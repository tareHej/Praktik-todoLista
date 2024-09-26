import 'server-only'

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  sv: () => import('../dictionaries/sv.json').then((module) => module.default),
}
 
type LocalKey = keyof typeof dictionaries;

export const getDictionary = async (locale: LocalKey) => dictionaries[locale]()
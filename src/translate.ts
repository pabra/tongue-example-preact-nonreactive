import initTongue from '@pabra/tongue-translate';
import makeStore from 'react-hooksack';
import de from '../tongue_de.json';
import en from '../tongue_en.json';
import entries from '../tongue_entries.json';
import es from '../tongue_es.json';
import fr from '../tongue_fr.json';

const dicts = { en, de, es, fr } as const;
const { getLanguage, setLanguage, t, translate } = initTongue(entries, dicts);
const reducer = (_lang: keyof typeof dicts, newLang: keyof typeof dicts) => {
  setLanguage(newLang);

  return newLang;
};
const useLangStore = makeStore<keyof typeof dicts, typeof reducer>(
  'en',
  reducer,
);

type Languages = keyof typeof dicts;
const languages = [...(Object.keys(dicts) as Languages[])] as const;

export type { Languages };
export { languages, getLanguage, setLanguage, t, translate, useLangStore };

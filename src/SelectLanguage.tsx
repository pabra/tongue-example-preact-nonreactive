import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useLogStore } from './LogTable';
import './styles.scss';
import {
  getLanguage,
  languages,
  t,
  translate,
  useLangStore,
} from './translate';
import { flags, isInArray } from './utils';

const titles = {
  en: `${t('english')} (${translate('en', 'english')})`,
  de: `${t('german')} (${translate('de', 'german')})`,
  es: `${t('spanish')} (${translate('es', 'spanish')})`,
  fr: `${t('french')} (${translate('fr', 'french')})`,
} as const;

const SelectLanguage: FunctionalComponent = () => {
  const componentName = SelectLanguage.name;
  const setLanguage = useLangStore('justSetter');
  const language = getLanguage();
  const handleSelect = (lang: string) => {
    setLanguage(isInArray(languages, lang) ? lang : 'en');
  };

  // start render logging
  const logRender = useLogStore('justSetter');
  useEffect(() => logRender(componentName));
  // end render logging

  return (
    <fieldset>
      <legend>{componentName}</legend>
      <p className="small">{t('describe-SetLanguage')}</p>
      <div>
        <select
          value={language}
          onChange={ev =>
            ev.target && handleSelect((ev.target as HTMLSelectElement).value)
          }
        >
          {languages.map(lang => (
            <option key={lang} value={lang} title={titles[lang]}>
              {flags[lang]}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

export default SelectLanguage;

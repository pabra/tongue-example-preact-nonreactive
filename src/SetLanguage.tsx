import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useLogStore } from './LogTable';
import './styles.scss';
import { languages, t, translate, useLangStore } from './translate';
import { flags } from './utils';

const titles = {
  en: translate('en', 'english'),
  de: translate('de', 'german'),
  es: translate('es', 'spanish'),
  fr: translate('fr', 'french'),
} as const;

const SetLanguage: FunctionalComponent = () => {
  const componentName = SetLanguage.name;
  const setLanguage = useLangStore('justSetter');
  Object.keys(flags).forEach(k => k);

  // start render logging
  const logRender = useLogStore('justSetter');
  useEffect(() => logRender(componentName));
  // end render logging

  return (
    <fieldset>
      <legend>{componentName}</legend>
      <p className="small">{t('describe-SetLanguage')}</p>
      <div>
        {languages.map(lang => (
          <button
            key={lang}
            type="button"
            title={titles[lang]}
            onClick={() => setLanguage(lang)}
          >
            {flags[lang]}
          </button>
        ))}
      </div>
    </fieldset>
  );
};

export default SetLanguage;

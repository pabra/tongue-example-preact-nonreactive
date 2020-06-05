import { FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { useLangStore } from './translate';

const htmlEl = document.querySelector('html');

const SetHtmlLanguage: FunctionalComponent = () => {
  const language = useLangStore('justState');

  useEffect(() => {
    if (!htmlEl) {
      return;
    }
    htmlEl.lang = language;
  }, [language]);

  return null;
};

export default SetHtmlLanguage;

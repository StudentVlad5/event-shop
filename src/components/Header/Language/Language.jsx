import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { SelectContainerLanguage, SelectLanguage } from './Language.styled';
import { saveToStorage, getFromStorage} from "../../../services/localStorService";

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const saveLanguage = getFromStorage('chosenLanguage');
    if (saveLanguage) {
      i18next.changeLanguage(saveLanguage);
      setSelectedLanguage(saveLanguage);
    }
  }, []);

  const changeLanguage = event => {
    const language = event.target.value;
    i18next.changeLanguage(language);
    saveToStorage('chosenLanguage', language);
    setSelectedLanguage(language);
  };

  return (
    <SelectContainerLanguage>
      <SelectLanguage onChange={changeLanguage} value={selectedLanguage}>
        <option value="fr">FR</option>
        <option value="ua">UA</option>
        <option value="ru">RU</option>
      </SelectLanguage>
    </SelectContainerLanguage>
  );
};

export default Language;

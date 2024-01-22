import i18next from 'i18next';
import React, { useContext } from 'react';
import { SelectContainerLanguage, SelectLanguage } from './Language.styled';
import { saveToStorage} from "../../../services/localStorService";
import { StatusContext } from 'components/ContextStatus/ContextStatus';

const Language = () => {
  const { selectedLanguage, setSelectedLanguage } = useContext(StatusContext);
 
  const changeLanguage = event => {
    i18next.changeLanguage(event.target.value);
    saveToStorage('chosenLanguage', event.target.value);
    setSelectedLanguage(event.target.value);
  };

  return (
    <SelectContainerLanguage>
      <SelectLanguage onChange={changeLanguage} value={selectedLanguage}>
        <option value="fr" label="fr">FR</option>
        <option value="ua" label="ua">UA</option>
        <option value="ru" label="ru">RU</option>
      </SelectLanguage>
    </SelectContainerLanguage>
  );
};

export default Language;

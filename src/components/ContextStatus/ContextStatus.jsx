import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { getFromStorage, saveToStorage } from 'services/localStorService';

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    getFromStorage('chosenLanguage') || 'fr'
  );

  if (!getFromStorage('chosenLanguage')) {
    saveToStorage('chosenLanguage', 'fr');
  }
  return (
    <StatusContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

StatusProvider.propTypes = {
  children: PropTypes.any,
};

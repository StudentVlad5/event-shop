import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import {
  ArrowIcon,
  ArrowIconUp,
  FiltersBox,
  FiltersBtn,
  FiltersBtnMenu,
  FiltersMenu,
  FiltersMenuOpen,
  FiltersMenuOpenText,
} from './Filters.styled';
import { useTranslation } from 'react-i18next';
import { StatusContext } from 'components/ContextStatus/ContextStatus';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { getFromStorage, saveToStorage } from 'services/localStorService';

export const Filters = ({ events, activeEvents }) => {
  const [isShown, setIsShown] = useState(false);
  const [isOpen, setIsOpen] = useState({});
  const { selectedLanguage } = useContext(StatusContext);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const toggleFilters = () => {
    setIsShown(!isShown);
  };

  const toggleVisibility = idx => {
    setIsOpen(prevState => ({
      ...prevState,
      [idx]: !prevState[idx],
    }));
  };

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/categories`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }

        let langData = [];
        data.map(it => {
          let item = [
            {
              _id: it._id,
              categoryId: it.categoryId,
              title: it.title,
              ...it[selectedLanguage],
            },
          ];
          langData.push(item[0]);
        });
        setCategories(langData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedLanguage]);

  const handleLanguageSelect = language => {
    const selectedLanguages = getFromStorage('filterSelectedLanguages') || [];
    const languageIndex = selectedLanguages.indexOf(language);

    if (languageIndex !== -1) {
      const updatedLanguages = [...selectedLanguages];
      updatedLanguages.splice(languageIndex, 1);
      saveToStorage('filterSelectedLanguages', updatedLanguages);
    } else {
      const updatedLanguages = [...selectedLanguages, language];
      saveToStorage('filterSelectedLanguages', updatedLanguages);
    }
  };

  const handleCategorySelect = category => {
    const selectedCategories = getFromStorage('filterSelectedCategories') || [];
    const categoryIndex = selectedCategories.indexOf(category);

    if (categoryIndex !== -1) {
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(categoryIndex, 1);
      saveToStorage('filterSelectedCategories', updatedCategories);
    } else {
      const updatedCategories = [...selectedCategories, category];
      saveToStorage('filterSelectedCategories', updatedCategories);
    }
  };

  const handleLocationSelect = location => {
    const selectedLocations = getFromStorage('filterSelectedLocation') || [];
    const locationIndex = selectedLocations.indexOf(location);

    if (locationIndex !== -1) {
      const updatedLocations = [...selectedLocations];
      updatedLocations.splice(locationIndex, 1);
      saveToStorage('filterSelectedLocation', updatedLocations);
    } else {
      const updatedLocations = [...selectedLocations, location];
      saveToStorage('filterSelectedLocation', updatedLocations);
    }
  };

  const handlePlacesSelect = places => {
    const selectedPlaces = getFromStorage('filterSelectedPlaces') || '';

    if (selectedPlaces === places) {
      saveToStorage('filterSelectedPlaces', '');
    } else {
      saveToStorage('filterSelectedPlaces', places);
    }
  };

  const uniqueLocations = [];

  return (
    <FiltersBox>
      <div style={{ position: 'relative' }}>
        <FiltersBtn onClick={toggleFilters}>
          {t('Фільтрувати за')} {isShown ? <ArrowIconUp /> : <ArrowIcon />}
        </FiltersBtn>

        {isShown && (
          <FiltersMenu>
            <div>
              <FiltersBtnMenu onClick={() => toggleVisibility(1)}>
                {t('Мова')} {isOpen[1] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[1] && (
                <FiltersMenuOpen>
                  <li onClick={() => handleLanguageSelect('Fr')}>
                    <FiltersMenuOpenText>{t('Французька')}</FiltersMenuOpenText>
                  </li>
                  <li onClick={() => handleLanguageSelect('En')}>
                    <FiltersMenuOpenText>{t('Англійська')}</FiltersMenuOpenText>
                  </li>
                  <li onClick={() => handleLanguageSelect('Uk')}>
                    <FiltersMenuOpenText>{t('Українська')}</FiltersMenuOpenText>
                  </li>
                  <li onClick={() => handleLanguageSelect('Ru')}>
                    <FiltersMenuOpenText>{t('Російська')}</FiltersMenuOpenText>
                  </li>
                </FiltersMenuOpen>
              )}
            </div>

            <div>
              <FiltersBtnMenu onClick={() => toggleVisibility(2)}>
                {t('Категорія заходу')}
                {isOpen[2] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[2] && (
                <FiltersMenuOpen>
                  {categories.map(category => (
                    <li
                      key={category._id}
                      onClick={() => handleCategorySelect(category.categoryId)}
                    >
                      <FiltersMenuOpenText>
                        {category.title}
                      </FiltersMenuOpenText>
                    </li>
                  ))}
                </FiltersMenuOpen>
              )}
            </div>

            <div>
              <FiltersBtnMenu onClick={() => toggleVisibility(3)}>
                {t('Місце')} {isOpen[3] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>
              {isOpen[3] && (
                <FiltersMenuOpen>
                  {activeEvents
                    .filter(event => event.status === 'active')
                    .map((event, idx) => {
                      if (!uniqueLocations.includes(event.location)) {
                        uniqueLocations.push(event.location);
                        return (
                          <li
                            key={idx}
                            onClick={() => handleLocationSelect(event.location)}
                          >
                            <FiltersMenuOpenText>
                              {event.location}
                            </FiltersMenuOpenText>
                          </li>
                        );
                      }
                    })}
                </FiltersMenuOpen>
              )}
            </div>

            <div>
              <FiltersBtnMenu onClick={() => toggleVisibility(4)}>
                {t('Вільні місця')}
                {isOpen[4] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[4] && (
                <FiltersMenuOpen>
                  <li onClick={() => handlePlacesSelect('yes')}>
                    <FiltersMenuOpenText>Вільні місця є</FiltersMenuOpenText>
                  </li>
                  <li onClick={() => handlePlacesSelect('no')}>
                    <FiltersMenuOpenText>
                      Вільних місць немає
                    </FiltersMenuOpenText>
                  </li>
                </FiltersMenuOpen>
              )}
            </div>
          </FiltersMenu>
        )}
      </div>
    </FiltersBox>
  );
};

Filters.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})),
  activeEvents: PropTypes.arrayOf(PropTypes.shape({})),
};

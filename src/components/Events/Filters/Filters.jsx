import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import {
  ArrowIcon,
  ArrowIconUp,
  ChairIcon,
  FiltersBox,
  FiltersBtn,
  FiltersBtnMenu,
  FiltersMenu,
  FiltersMenuDesktop,
  FiltersMenuDesktopBox,
  FiltersMenuMobileBox,
  FiltersMenuOpen,
  FiltersMenuOpenInput,
  FiltersMenuOpenLabel,
  FiltersMenuOpenText,
  LanguageIcon,
  ListIcon,
  LocationIcon,
} from './Filters.styled';
import { useTranslation } from 'react-i18next';
import { StatusContext } from 'components/ContextStatus/ContextStatus';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { getFromStorage, saveToStorage } from 'services/localStorService';
import { theme } from 'components/baseStyles/Variables.styled';

export const Filters = ({
  activeEvents,
  setSelectedLanguages,
  setSelectedCategories,
  setSelectedLocations,
  setSelectedPlaces,
  selectedLanguages,
  selectedCategories,
  selectedLocations,
  selectedPlaces,
}) => {
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
    const languageIndex = selectedLanguages.indexOf(language);

    if (languageIndex !== -1) {
      const updatedLanguages = [...selectedLanguages];
      updatedLanguages.splice(languageIndex, 1);
      saveToStorage('filterSelectedLanguages', updatedLanguages);
      setSelectedLanguages(updatedLanguages);
    } else {
      const updatedLanguages = [...selectedLanguages, language];
      saveToStorage('filterSelectedLanguages', updatedLanguages);
      setSelectedLanguages(updatedLanguages);
    }
  };

  const handleCategorySelect = category => {
    const categoryIndex = selectedCategories.indexOf(category);

    if (categoryIndex !== -1) {
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(categoryIndex, 1);
      saveToStorage('filterSelectedCategories', updatedCategories);
      setSelectedCategories(updatedCategories);
    } else {
      const updatedCategories = [...selectedCategories, category];
      saveToStorage('filterSelectedCategories', updatedCategories);
      setSelectedCategories(updatedCategories);
    }
  };

  const handleLocationSelect = location => {
    const locationIndex = selectedLocations.indexOf(location);

    if (locationIndex !== -1) {
      const updatedLocations = [...selectedLocations];
      updatedLocations.splice(locationIndex, 1);
      saveToStorage('filterSelectedLocation', updatedLocations);
      setSelectedLocations(updatedLocations);
    } else {
      const updatedLocations = [...selectedLocations, location];
      saveToStorage('filterSelectedLocation', updatedLocations);
      setSelectedLocations(updatedLocations);
    }
  };

  const handlePlacesSelect = places => {
    if (selectedPlaces === places) {
      saveToStorage('filterSelectedPlaces', '');
      setSelectedPlaces('');
    } else {
      saveToStorage('filterSelectedPlaces', places);
      setSelectedPlaces(places);
    }
  };

  const uniqueLocations = [];

  return (
    <FiltersBox>
      <div style={{ position: 'relative' }}>
        <FiltersBtn
          onClick={toggleFilters}
          $props={
            selectedLanguages?.length > 0 ||
            selectedCategories?.length > 0 ||
            selectedLocations?.length > 0 ||
            selectedPlaces === 'yes' ||
            selectedPlaces === 'no'
              ? theme.colors.accent
              : theme.colors.grey1
          }
        >
          {t('Filtrer par')} {isShown ? <ArrowIconUp /> : <ArrowIcon />}
        </FiltersBtn>

        {isShown && (
          <FiltersMenu>
            <FiltersMenuMobileBox>
              <FiltersBtnMenu
                onClick={() => toggleVisibility(1)}
                $props={
                  selectedLanguages?.length > 0
                    ? theme.colors.accent
                    : theme.colors.grey1
                }
              >
                {t('Langue')} {isOpen[1] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[1] && (
                <FiltersMenuOpen>
                  <li>
                    <FiltersMenuOpenLabel>
                      <FiltersMenuOpenInput
                        type="checkbox"
                        checked={selectedLanguages.includes('Fr')}
                        onChange={() => handleLanguageSelect('Fr')}
                      />
                      <FiltersMenuOpenText
                        checked={selectedLanguages.includes('Fr')}
                      >
                        {t('Francaise')}
                      </FiltersMenuOpenText>
                    </FiltersMenuOpenLabel>
                  </li>
                  <li>
                    <FiltersMenuOpenLabel>
                      <FiltersMenuOpenInput
                        type="checkbox"
                        checked={selectedLanguages.includes('En')}
                        onChange={() => handleLanguageSelect('En')}
                      />
                      <FiltersMenuOpenText
                        checked={selectedLanguages.includes('En')}
                      >
                        {t('Anglaise')}
                      </FiltersMenuOpenText>
                    </FiltersMenuOpenLabel>
                  </li>
                  <li>
                    <FiltersMenuOpenLabel>
                      <FiltersMenuOpenInput
                        type="checkbox"
                        checked={selectedLanguages.includes('Uk')}
                        onChange={() => handleLanguageSelect('Uk')}
                      />
                      <FiltersMenuOpenText
                        checked={selectedLanguages.includes('Uk')}
                      >
                        {t('Ukrainien')}
                      </FiltersMenuOpenText>
                    </FiltersMenuOpenLabel>
                  </li>
                  <li>
                    <FiltersMenuOpenLabel>
                      <FiltersMenuOpenInput
                        type="checkbox"
                        checked={selectedLanguages.includes('Ru')}
                        onChange={() => handleLanguageSelect('Ru')}
                      />
                      <FiltersMenuOpenText
                        checked={selectedLanguages.includes('Ru')}
                      >
                        {t('Russe')}
                      </FiltersMenuOpenText>
                    </FiltersMenuOpenLabel>
                  </li>
                </FiltersMenuOpen>
              )}
            </FiltersMenuMobileBox>

            <FiltersMenuMobileBox>
              <FiltersBtnMenu
                onClick={() => toggleVisibility(2)}
                $props={
                  selectedCategories?.length > 0
                    ? theme.colors.accent
                    : theme.colors.grey1
                }
              >
                {t('Catégories des evenements')}
                {isOpen[2] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>
              {isOpen[2] && (
                <FiltersMenuOpen>
                  {categories.map(category => (
                    <li key={category._id}>
                      <FiltersMenuOpenLabel>
                        <FiltersMenuOpenInput
                          type="checkbox"
                          checked={selectedCategories.includes(
                            category.categoryId
                          )}
                          onChange={() =>
                            handleCategorySelect(category.categoryId)
                          }
                        />
                        <FiltersMenuOpenText
                          checked={selectedCategories.includes(
                            category.categoryId
                          )}
                        >
                          {category.title}
                        </FiltersMenuOpenText>
                      </FiltersMenuOpenLabel>
                    </li>
                  ))}
                </FiltersMenuOpen>
              )}
            </FiltersMenuMobileBox>

            <FiltersMenuMobileBox>
              <FiltersBtnMenu
                onClick={() => toggleVisibility(3)}
                $props={
                  selectedLocations?.length > 0
                    ? theme.colors.accent
                    : theme.colors.grey1
                }
              >
                {t('Localisation')}
                {isOpen[3] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>
              {isOpen[3] && (
                <FiltersMenuOpen>
                  {activeEvents
                    .filter(event => event.status === 'active')
                    .map((event, idx) => {
                      if (!uniqueLocations.includes(event.location)) {
                        uniqueLocations.push(event.location);
                        return (
                          <li key={idx}>
                            <FiltersMenuOpenLabel>
                              <FiltersMenuOpenInput
                                type="checkbox"
                                checked={selectedLocations.includes(
                                  event.location
                                )}
                                onChange={() =>
                                  handleLocationSelect(event.location)
                                }
                              />
                              <FiltersMenuOpenText
                                checked={selectedLocations.includes(
                                  event.location
                                )}
                              >
                                {event.location}
                              </FiltersMenuOpenText>
                            </FiltersMenuOpenLabel>
                          </li>
                        );
                      }
                    })}
                </FiltersMenuOpen>
              )}
            </FiltersMenuMobileBox>

            <FiltersMenuMobileBox>
              <FiltersBtnMenu
                onClick={() => toggleVisibility(4)}
                $props={
                  selectedPlaces === 'yes' || selectedPlaces === 'no'
                    ? theme.colors.accent
                    : theme.colors.grey1
                }
              >
                {t('places disponibles')}
                {isOpen[4] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[4] && (
                <FiltersMenuOpen>
                  <li>
                    <FiltersMenuOpenLabel>
                      <FiltersMenuOpenInput
                        type="checkbox"
                        checked={selectedPlaces === 'yes'}
                        onChange={() => handlePlacesSelect('yes')}
                      />
                      <FiltersMenuOpenText checked={selectedPlaces === 'yes'}>
                        {t('Il y a des places disponibles')}
                      </FiltersMenuOpenText>
                    </FiltersMenuOpenLabel>
                  </li>
                  {/* <li>
                    <FiltersMenuOpenLabel>
                      <FiltersMenuOpenInput
                        type="checkbox"
                        checked={selectedPlaces === 'no'}
                        onChange={() => handlePlacesSelect('no')}
                      />
                      <FiltersMenuOpenText checked={selectedPlaces === 'no'}>
                        {t("Il n'y a pas de places disponibles")}
                      </FiltersMenuOpenText>
                    </FiltersMenuOpenLabel>
                  </li> */}
                </FiltersMenuOpen>
              )}
            </FiltersMenuMobileBox>
          </FiltersMenu>
        )}

        <FiltersMenuDesktop>
          <FiltersMenuDesktopBox>
            <FiltersBtnMenu
              onClick={() => toggleVisibility(1)}
              $props={
                selectedLanguages?.length > 0
                  ? theme.colors.accent
                  : theme.colors.grey1
              }
            >
              <LanguageIcon
                $props={
                  selectedLanguages?.length > 0
                    ? theme.colors.accent
                    : theme.colors.grey1
                }
              />
              {t('Langue')}
              {isOpen[1] ? <ArrowIconUp /> : <ArrowIcon />}
            </FiltersBtnMenu>

            {isOpen[1] && (
              <FiltersMenuOpen>
                <li>
                  <FiltersMenuOpenLabel>
                    <FiltersMenuOpenInput
                      type="checkbox"
                      checked={selectedLanguages.includes('Fr')}
                      onChange={() => handleLanguageSelect('Fr')}
                    />
                    <FiltersMenuOpenText
                      checked={selectedLanguages.includes('Fr')}
                    >
                      {t('Francaise')}
                    </FiltersMenuOpenText>
                  </FiltersMenuOpenLabel>
                </li>
                <li>
                  <FiltersMenuOpenLabel>
                    <FiltersMenuOpenInput
                      type="checkbox"
                      checked={selectedLanguages.includes('En')}
                      onChange={() => handleLanguageSelect('En')}
                    />
                    <FiltersMenuOpenText
                      checked={selectedLanguages.includes('En')}
                    >
                      {t('Anglaise')}
                    </FiltersMenuOpenText>
                  </FiltersMenuOpenLabel>
                </li>
                <li>
                  <FiltersMenuOpenLabel>
                    <FiltersMenuOpenInput
                      type="checkbox"
                      checked={selectedLanguages.includes('Uk')}
                      onChange={() => handleLanguageSelect('Uk')}
                    />
                    <FiltersMenuOpenText
                      checked={selectedLanguages.includes('Uk')}
                    >
                      {t('Ukrainien')}
                    </FiltersMenuOpenText>
                  </FiltersMenuOpenLabel>
                </li>
                <li>
                  <FiltersMenuOpenLabel>
                    <FiltersMenuOpenInput
                      type="checkbox"
                      checked={selectedLanguages.includes('Ru')}
                      onChange={() => handleLanguageSelect('Ru')}
                    />
                    <FiltersMenuOpenText
                      checked={selectedLanguages.includes('Ru')}
                    >
                      {t('Russe')}
                    </FiltersMenuOpenText>
                  </FiltersMenuOpenLabel>
                </li>
              </FiltersMenuOpen>
            )}
          </FiltersMenuDesktopBox>

          <FiltersMenuDesktopBox>
            <FiltersBtnMenu
              onClick={() => toggleVisibility(2)}
              $props={
                selectedCategories?.length > 0
                  ? theme.colors.accent
                  : theme.colors.grey1
              }
            >
              <ListIcon
                $props={
                  selectedCategories?.length > 0
                    ? theme.colors.accent
                    : theme.colors.grey1
                }
              />
              {t('Catégories des evenements')}
              {isOpen[2] ? <ArrowIconUp /> : <ArrowIcon />}
            </FiltersBtnMenu>

            {isOpen[2] && (
              <FiltersMenuOpen>
                {categories.map(category => (
                  <li key={category._id}>
                    <FiltersMenuOpenLabel>
                      <FiltersMenuOpenInput
                        type="checkbox"
                        checked={selectedCategories.includes(
                          category.categoryId
                        )}
                        onChange={() =>
                          handleCategorySelect(category.categoryId)
                        }
                      />
                      <FiltersMenuOpenText
                        checked={selectedCategories.includes(
                          category.categoryId
                        )}
                      >
                        {category.title}
                      </FiltersMenuOpenText>
                    </FiltersMenuOpenLabel>
                  </li>
                ))}
              </FiltersMenuOpen>
            )}
          </FiltersMenuDesktopBox>

          <FiltersMenuDesktopBox>
            <FiltersBtnMenu
              onClick={() => toggleVisibility(3)}
              $props={
                selectedLocations?.length > 0
                  ? theme.colors.accent
                  : theme.colors.grey1
              }
            >
              <LocationIcon
                $props={
                  selectedLocations?.length > 0
                    ? theme.colors.accent
                    : theme.colors.grey1
                }
              />
              {t('Localisation')}
              {isOpen[3] ? <ArrowIconUp /> : <ArrowIcon />}
            </FiltersBtnMenu>
            {isOpen[3] && (
              <FiltersMenuOpen>
                {activeEvents
                  .filter(event => event.status === 'active')
                  .map((event, idx) => {
                    if (!uniqueLocations.includes(event.location)) {
                      uniqueLocations.push(event.location);
                      return (
                        <li key={idx}>
                          <FiltersMenuOpenLabel>
                            <FiltersMenuOpenInput
                              type="checkbox"
                              checked={selectedLocations.includes(
                                event.location
                              )}
                              onChange={() =>
                                handleLocationSelect(event.location)
                              }
                            />
                            <FiltersMenuOpenText
                              checked={selectedLocations.includes(
                                event.location
                              )}
                            >
                              {event.location}
                            </FiltersMenuOpenText>
                          </FiltersMenuOpenLabel>
                        </li>
                      );
                    }
                  })}
              </FiltersMenuOpen>
            )}
          </FiltersMenuDesktopBox>

          <FiltersMenuDesktopBox>
            <FiltersBtnMenu
              onClick={() => toggleVisibility(4)}
              $props={
                selectedPlaces === 'yes' || selectedPlaces === 'no'
                  ? theme.colors.accent
                  : theme.colors.grey1
              }
            >
              <ChairIcon
                $props={
                  selectedPlaces === 'yes' || selectedPlaces === 'no'
                    ? theme.colors.accent
                    : theme.colors.grey1
                }
              />
              {t('Places disponibles')}
              {isOpen[4] ? <ArrowIconUp /> : <ArrowIcon />}
            </FiltersBtnMenu>

            {isOpen[4] && (
              <FiltersMenuOpen>
                <li>
                  <FiltersMenuOpenLabel>
                    <FiltersMenuOpenInput
                      type="checkbox"
                      checked={selectedPlaces === 'yes'}
                      onChange={() => handlePlacesSelect('yes')}
                    />
                    <FiltersMenuOpenText checked={selectedPlaces === 'yes'}>
                      {t('Il y a des places disponibles')}
                    </FiltersMenuOpenText>
                  </FiltersMenuOpenLabel>
                </li>
                <li>
                  <FiltersMenuOpenLabel>
                    <FiltersMenuOpenInput
                      type="checkbox"
                      checked={selectedPlaces === 'no'}
                      onChange={() => handlePlacesSelect('no')}
                    />
                    <FiltersMenuOpenText checked={selectedPlaces === 'no'}>
                      {t("Il n'y a pas de places disponibles")}
                    </FiltersMenuOpenText>
                  </FiltersMenuOpenLabel>
                </li>
              </FiltersMenuOpen>
            )}
          </FiltersMenuDesktopBox>
        </FiltersMenuDesktop>
      </div>
    </FiltersBox>
  );
};

Filters.propTypes = {
  activeEvents: PropTypes.arrayOf(PropTypes.shape({})),
  setSelectedLanguages: PropTypes.func,
  setSelectedCategories: PropTypes.func,
  setSelectedLocations: PropTypes.func,
  setSelectedPlaces: PropTypes.func,
  selectedLanguages: PropTypes.any,
  selectedCategories: PropTypes.any,
  selectedLocations: PropTypes.any,
  selectedPlaces: PropTypes.any,
};

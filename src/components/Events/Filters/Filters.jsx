import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import {
  ArrowIcon,
  ArrowIconUp,
  FiltersBox,
  FiltersBtn,
  FiltersBtnMenu,
  FiltersMenu,
} from './Filters.styled';
import { useTranslation } from 'react-i18next';
import { StatusContext } from 'components/ContextStatus/ContextStatus';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { saveToStorage } from 'services/localStorService';

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
    saveToStorage('filterSelectedLanguage', language);
  };

  const handleCategorySelect = category => {
    saveToStorage('filterSelectedCategory', category);
  };

  const handlePlacesSelect = palces => {
    saveToStorage('filterSelectedPlaces', palces);
  };

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
                <div>
                  <ul>
                    <li onClick={() => handleLanguageSelect('Fr')}>
                      <p>{t('Французька')}</p>
                    </li>
                    <li onClick={() => handleLanguageSelect('En')}>
                      <p>{t('Англійська')}</p>
                    </li>
                    <li onClick={() => handleLanguageSelect('Uk')}>
                      <p>{t('Українська')}</p>
                    </li>
                    <li onClick={() => handleLanguageSelect('Ru')}>
                      <p>{t('Російська')}</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <FiltersBtnMenu onClick={() => toggleVisibility(2)}>
                {t('Категорія заходу')}
                {isOpen[2] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[2] && (
                <div>
                  <ul>
                    {categories.map(category => (
                      <li
                        key={category._id}
                        onClick={() =>
                          handleCategorySelect(category.categoryId)
                        }
                      >
                        <p>{category.title}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <FiltersBtnMenu>
                {t('Місце')} <ArrowIcon />
              </FiltersBtnMenu>
            </div>

            <div>
              <FiltersBtnMenu onClick={() => toggleVisibility(4)}>
                {t('Вільні місця')}
                {isOpen[4] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[4] && (
                <div>
                  <ul>
                    <li onClick={() => handlePlacesSelect('yes')}>
                      <p>Вільні місця є</p>
                    </li>
                    <li onClick={() => handlePlacesSelect('no')}>
                      <p>Вільних місць немає</p>
                    </li>
                  </ul>
                </div>
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

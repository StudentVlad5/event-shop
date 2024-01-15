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

  return (
    <FiltersBox>
      <div style={{ position: 'relative' }}>
        <FiltersBtn onClick={toggleFilters}>
          Фільтрувати за {isShown ? <ArrowIconUp /> : <ArrowIcon />}
        </FiltersBtn>

        {isShown && (
          <FiltersMenu>
            <div>
              <FiltersBtnMenu onClick={() => toggleVisibility(1)}>
                Мова {isOpen[1] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[1] && (
                <div>
                  <ul>
                    <li onClick={() => handleLanguageSelect('Fr')}>
                      <p>Французька</p>
                    </li>
                    <li onClick={() => handleLanguageSelect('En')}>
                      <p>Англійська</p>
                    </li>
                    <li onClick={() => handleLanguageSelect('Uk')}>
                      <p>Українська</p>
                    </li>
                    <li onClick={() => handleLanguageSelect('Ru')}>
                      <p>Російська</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <FiltersBtnMenu onClick={() => toggleVisibility(2)}>
                Категорія заходу {isOpen[2] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[2] && (
                <div>
                  <ul>
                    {categories.map(category => (
                      <li
                        key={category._id}
                        onClick={() => handleCategorySelect(category.categoryId)}
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
                Місце <ArrowIcon />
              </FiltersBtnMenu>
            </div>

            <div>
              <FiltersBtnMenu onClick={() => toggleVisibility(4)}>
                Вільні місця {isOpen[4] ? <ArrowIconUp /> : <ArrowIcon />}
              </FiltersBtnMenu>

              {isOpen[4] && (
                <div>
                  <ul>
                    <li>
                      <p>Більше 5</p>
                    </li>
                    <li>
                      <p>Більше 10</p>
                    </li>
                    <li>
                      <p>Менше 5</p>
                    </li>
                    <li>
                      <p>Менше 10</p>
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

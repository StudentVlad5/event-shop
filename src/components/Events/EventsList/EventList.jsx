import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BASE_URL_IMG } from 'helpers/constants';
import {
  BtnLightEvents,
  CleanFilterBtn,
  DetailsBox,
  DetailsBoxDiscr,
  Event,
  EventDetailBox,
  EventDetailDate,
  EventDetailDateLi,
  EventDetailDateText,
  EventDetailDateText2,
  EventDetailTitle,
  EventImages,
  EventNavLink,
  List,
  NoEvents,
} from './EventList.styled';
import defaultImg from 'images/No-image-available.webp';
import { useEffect, useState } from 'react';
import { BtnLink } from 'components/baseStyles/Button.styled';
import { getFromStorage, removeItem } from 'services/localStorService';

export const EventsList = ({
  events,
  activeEvents,
  currentWeek,
  selectedDate,
  setSelectedDate
}) => {
  const { t } = useTranslation();
  const [isHovered, setHovered] = useState(null);
  const initialEvents = 6;
  const [eventsNumber, setEventsNumber] = useState(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);
  const [filterLanguage, setfilterLanguage] = useState([]);
  const [filterCategory, setfilterCategory] = useState([]);
  const [filterPlaces, setfilterPlaces] = useState([]);
  const [filterLocation, setfilterLocation] = useState([]);
  const [activeEventsArr, setActiveEventsArr] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const newFilteredEvents = activeEvents.filter(
        event =>
          new Date(event.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      );
      console.log("newFilteredEvents", newFilteredEvents)
      setFilteredEvents(newFilteredEvents);
      setNoEvents(newFilteredEvents.length === 0);
    } else {
      setNoEvents(false);
    }
  }, [selectedDate, activeEvents]);

  const isLanguageSelected = event => {
    const selectedLanguages = getFromStorage('filterSelectedLanguages') || [];

    return selectedLanguages.some(selectedLanguage => {
      return (
        event.language === selectedLanguage ||
        event.language_secondary === selectedLanguage ||
        event.language_third === selectedLanguage
      );
    });
  };

  const isCategorySelected = event => {
    const selectedCategories = getFromStorage('filterSelectedCategories') || [];

    return selectedCategories.some(selectedCategory => {
      return (
        event.category === selectedCategory ||
        event.category_secondary === selectedCategory ||
        event.category_third === selectedCategory
      );
    });
  };

  const isLocationSelected = event => {
    const selectedLocations = getFromStorage('filterSelectedLocation') || [];

    return selectedLocations.some(selectedLocation => {
      return event.location === selectedLocation;
    });
  };

  useEffect(() => {
    const filteredEventsByLang = activeEvents.filter(event => {
      return isLanguageSelected(event);
    });
    setfilterLanguage(filteredEventsByLang);

    const filteredEventsByCategory = events.filter(event => {
      return isCategorySelected(event);
    });
    setfilterCategory(filteredEventsByCategory);

    const getPlaces = getFromStorage('filterSelectedPlaces');
    let filteredEventsByPlaces = [];

    if (getPlaces === 'yes') {
      filteredEventsByPlaces = activeEvents.filter(event => {
        return event.vacancies !== 0;
      });
    } else if (getPlaces === 'no') {
      filteredEventsByPlaces = activeEvents.filter(event => {
        return event.vacancies === 0;
      });
    } else {
      filteredEventsByPlaces = [];
    }
    setfilterPlaces(filteredEventsByPlaces);

    const filteredEventsByLocation = activeEvents.filter(event => {
      return isLocationSelected(event);
    });

    setfilterLocation(filteredEventsByLocation);
  }, [
    activeEvents,
    events,
    getFromStorage('filterSelectedPlaces'),
  ]);

  const handleMouseEnter = i => {
    setHovered(i);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleEventsNumber = () => {
    setEventsNumber(eventsNumber + 6);
  };

  const handleCleanFilter = () => {
    removeItem('selectedDate');
    removeItem('filterSelectedLanguages');
    removeItem('filterSelectedCategories');
    removeItem('filterSelectedPlaces');
    removeItem('filterSelectedLocation');

    setSelectedDate(null);
    setfilterLanguage([]);
    setfilterCategory([]);
    setfilterPlaces([]);
    setfilterLocation([]);
  };

  useEffect(() => {
    let array = [];
    activeEvents.map(it => {
      events.map(item => {
        if (it.eventId === item.article_event && it.status === 'active') {
          let data = {};
          (data._id = it._id),
            (data.article_event = item.article_event),
            (data.language = it.language),
            (data.language_secondary = it.language_secondary),
            (data.language_third = it.language_third),
            (data.price = it.price),
            (data.date = it.date),
            (data.time = it.time),
            (data.location = it.location),
            (data.address = it.address),
            (data.seats = it.seats),
            (data.booking = it.booking),
            (data.vacancies = it.vacancies),
            (data.image = item.image),
            (data.image_1 = item.image_1),
            (data.image_2 = item.image_2),
            (data.rating = item.rating),
            (data.duration = item.duration),
            (data.category = item.category),
            (data.category_second = item.category_second),
            (data.category_third = item.category_third),
            (data.specialistId = item.specialistId),
            (data.description = item.description),
            (data.name = item.name),
            (data.status = item.status),
            array.push(data);
        }
      });
    });
    setActiveEventsArr(array);
  }, [activeEvents, events]);


  const languageFilterLength = filterLanguage.length;
  const categoryFilterLength = filterCategory.length;
  const placesFilterLength = filterPlaces.length;
  const locationFilterLength = filterLocation.length;


  let filteredActiveEvents = activeEventsArr;
  let filtersApplied = false;

  if (languageFilterLength > 0) {
    filteredActiveEvents = filteredActiveEvents.filter(it =>
      filterLanguage.some(
        activeEvent => activeEvent.eventId === it.article_event
      )
    );
    filtersApplied = true;
  }

  if (filteredEvents.length > 0) {
    filteredActiveEvents = filteredActiveEvents.filter(it => {
      filteredEvents.filter(
        activeEvent => activeEvent.eventId === it.article_event
      );
    });
  }
  if (placesFilterLength > 0) {
    filteredActiveEvents = filteredActiveEvents.filter(it =>
      filterPlaces.some(activeEvent => activeEvent.eventId === it.article_event)
    );
    filtersApplied = true;
  }
  if (locationFilterLength > 0) {
    filteredActiveEvents = filteredActiveEvents.filter(it =>
      filterLocation.some(
        activeEvent => activeEvent.eventId === it.article_event
      )
    );
    filtersApplied = true;
  }
  if (!filtersApplied) {
    const newFilteredWeek = activeEvents
      .filter(week =>
        currentWeek.some(
          day => new Date(week.date).toLocaleDateString() === day
        )
      )
      .filter(event => event.status === 'active');

      filteredActiveEvents = activeEventsArr.filter(it =>
      newFilteredWeek.some(
        filteredEvent => filteredEvent.eventId === it.article_event
      )
    );
  }

  const eventsToDisplay = filteredActiveEvents.map(it=>it);
  return (
    <>
      <CleanFilterBtn onClick={handleCleanFilter}>
        {t('Очистити фільтри')}
      </CleanFilterBtn>
      {noEvents && (
        <NoEvents>
          {t('На дату')} {new Date(selectedDate).toLocaleDateString()}
          {t('подій немає')}
        </NoEvents>
      )}
      <List>
        {eventsToDisplay
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, eventsNumber)
          .map((event, i) => {
            return (
              <Event key={i}>
                <EventNavLink
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <EventImages
                    src={
                      event.image
                        ? BASE_URL_IMG +
                          'events/' +
                          event.image.split('/')[
                            event.image.split('/').length - 1
                          ]
                        : defaultImg
                    }
                    alt={event.title}
                    loading="lazy"
                  />

                  {isHovered === i && (
                    <EventDetailBox
                      $ishovered={isHovered === i ? 'flex' : 'none'}
                    >
                      <EventDetailTitle>{event.name}</EventDetailTitle>

                      <DetailsBox>
                        <EventDetailDate>
                          <EventDetailDateLi>
                            <EventDetailDateText>
                              {t('Дата')}
                            </EventDetailDateText>
                          </EventDetailDateLi>
                          <EventDetailDateLi>
                            <EventDetailDateText2>
                              {new Date(event.date).toLocaleDateString()}
                            </EventDetailDateText2>
                          </EventDetailDateLi>
                        </EventDetailDate>

                        <ul>
                          <li>
                            <EventDetailDateText>
                              {t('Час')}
                            </EventDetailDateText>
                          </li>
                          <li>
                            <EventDetailDateText2>
                              {event.time}
                            </EventDetailDateText2>
                          </li>
                        </ul>
                      </DetailsBox>

                      <DetailsBoxDiscr>
                        {event.description.length > 50
                          ? event.description.slice(0, 50) + ' ...'
                          : event.description}
                      </DetailsBoxDiscr>

                      <BtnLink to={`/events/${event.article_event}`}>
                        <span>{t('Детальніше')}</span>
                      </BtnLink>
                    </EventDetailBox>
                  )}
                </EventNavLink>
              </Event>
            );
          })}
      </List>
      {eventsNumber < activeEventsArr.length && (
        <BtnLightEvents onClick={handleEventsNumber}>
          <span> {t('Показати більше')} </span>
        </BtnLightEvents>
      )}
    </>
  );
};

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})),
  currentWeek: PropTypes.any,
  selectedDate: PropTypes.any,
  setSelectedDate: PropTypes.any,
  activeEvents: PropTypes.arrayOf(
    PropTypes.shape({
    })
  ),
};

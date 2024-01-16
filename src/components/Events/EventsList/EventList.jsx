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

export const EventsList = ({ events, activeEvents }) => {
  const { t } = useTranslation();
  // const [activeEvents, setActiveEvents] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [isHovered, setHovered] = useState(null);
  // const today = new Date();
  // const activeEvents = events.filter(({ date }) => new Date(date) >= today);
  // const widthWindow = window.innerWidth;
  // const { selectedLanguage } = useContext(StatusContext);
  const initialEvents = 6;
  const [eventsNumber, setEventsNumber] = useState(initialEvents);

  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);
  // const [currentWeek, setCurrentWeek] = useState([]);
  const [filterLanguage, setfilterLanguage] = useState([]);
  const [filterCategory, setfilterCategory] = useState([]);
  const [filterPlaces, setfilterPlaces] = useState([]);
  const [activeEventsArr, setActiveEventsArr] = useState([]);

  useEffect(() => {
    const storedDate = getFromStorage('selectedDate');
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }
  }, [getFromStorage('selectedDate')]);

  // if (!getFromStorage('selectedDate')) {
  //   saveToStorage(new Date());
  // }

  // const [selectedDate, setSelectedDate] = useState(
  //   getFromStorage('selectedDate')
  //     ? new Date(getFromStorage('selectedDate'))
  //     : new Date()
  // );

  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    const storedCurrentWeek = getFromStorage('currentWeek');
    const formattedStoredWeek = storedCurrentWeek
      ? storedCurrentWeek.map(dateStr => new Date(dateStr).toLocaleDateString())
      : [];

    if (JSON.stringify(formattedStoredWeek) !== JSON.stringify(currentWeek)) {
      setCurrentWeek(formattedStoredWeek);
    }
  }, [getFromStorage('currentWeek')]);

  useEffect(() => {
    if (selectedDate) {
      const newFilteredEvents = activeEvents.filter(
        event =>
          new Date(event.date).toLocaleDateString() ===
          selectedDate.toLocaleDateString()
      );
      setFilteredEvents(newFilteredEvents);

      setNoEvents(newFilteredEvents.length === 0);
    } else {
      setFilteredEvents(events);
      setNoEvents(false);
    }
  }, [selectedDate, activeEvents, events]);

  useEffect(() => {
    const getLang = getFromStorage('filterSelectedLanguage');
    const filteredEventsByLang = activeEvents.filter(event => {
      return (
        event.language === getLang ||
        event.language_secondary === getLang ||
        event.language_third === getLang
      );
    });
    // console.log(filteredEventsByLang);

    setfilterLanguage(filteredEventsByLang);

    const getCategoty = getFromStorage('filterSelectedCategory');
    const filteredEventsByCategoty = events.filter(event => {
      return (
        event.category === getCategoty ||
        event.category_second === getCategoty ||
        event.category_third === getCategoty
      );
    });

    // console.log(filteredEventsByCategoty);
    setfilterCategory(filteredEventsByCategoty);

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

    console.log(filteredEventsByPlaces);
    setfilterPlaces(filteredEventsByPlaces);
  }, [
    activeEvents,
    events,
    getFromStorage('filterSelectedLanguage'),
    getFromStorage('filterSelectedCategory'),
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
    removeItem('filterSelectedLanguage');
    removeItem('filterSelectedCategory');
    removeItem('filterSelectedPlaces');

    setSelectedDate(null);
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

  return (
    <>
      <CleanFilterBtn onClick={handleCleanFilter}>
        Очистити фільтри
      </CleanFilterBtn>
      <List>
        {activeEventsArr
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, eventsNumber)
          .map((event, i) => {
            const newFilteredWeek = activeEvents.filter(week =>
              currentWeek.some(
                day => new Date(week.date).toLocaleDateString() === day
              )
            );

            // const matchingActiveEvents = activeEvents.filter(
            //   activeEvent => activeEvent.eventId === event.article_event
            // );

            const filteredActiveByEvents = filteredEvents.filter(
              activeEvent => activeEvent.eventId === event.article_event
            );

            const filteredActiveByLang = filterLanguage.filter(
              activeEvent => activeEvent.eventId === event.article_event
            );

            const filteredActiveByCategory = filterCategory.filter(ev => {
              return activeEvents.filter(
                activeEvent => activeEvent.eventId === ev.article_event
              );
            });

            const filteredActiveByPlaces = filterPlaces.filter(
              activeEvent => activeEvent.eventId === event.article_event
            );

            // const filteredActiveByCategory = filterCategory.map(eventIt => {
            //   const matchingActiveEvent = activeEvents.find(
            //     activeEvent => activeEvent.eventId === eventIt.article_event
            //   );

            //   return matchingActiveEvent;
            // });
            // console.log(filteredActiveByCategory);

            let shouldDisplay = true;

            // if (selectedDate) {
            // shouldDisplay = filtredActiveByEvents?.length > 0;
            // shouldDisplay = newFilteredWeek.length > 0;
            // shouldDisplay = filteredActiveByPlaces.length > 0;

            // } else {
            // shouldDisplay = matchingActiveEvents?.length > 0;
            // shouldDisplay = newFilteredWeek.some(
            //   filteredEvent => filteredEvent.eventId === event.article_event
            // );
            // }

            if (shouldDisplay) {
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
                              {/* {matchingActiveEvents.map((ev, idx) => ( */}
                              <EventDetailDateText2>
                                {new Date(event.date).toLocaleDateString()}
                              </EventDetailDateText2>
                              {/* // ))} */}
                            </EventDetailDateLi>
                          </EventDetailDate>

                          <ul>
                            <li>
                              <EventDetailDateText>
                                {t('Час')}
                              </EventDetailDateText>
                            </li>
                            <li>
                              {/* {matchingActiveEvents.map((ev, idx) => ( */}
                              <EventDetailDateText2>
                                {event.time}
                              </EventDetailDateText2>
                              {/* ))} */}
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
            }
          })}
        {noEvents && (
          <NoEvents>
            На дату {new Date(selectedDate).toLocaleDateString()} подій немає
          </NoEvents>
        )}
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
  activeEvents: PropTypes.arrayOf(
    PropTypes.shape({
      // _id: PropTypes.string.isRequired,
      // date: PropTypes.string.isRequired,
      // time: PropTypes.string.isRequired,
      // duration: PropTypes.string.isRequired,
      // location: PropTypes.string.isRequired,
      // title: PropTypes.string.isRequired,
      // description: PropTypes.string,
      // language: PropTypes.string,
      // image: PropTypes.string,
    })
  ),
};

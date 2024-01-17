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
  // currentWeek,
  // setCurrentWeek,
}) => {
  const { t } = useTranslation();
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
  const [filterLanguage, setfilterLanguage] = useState([]);
  const [filterCategory, setfilterCategory] = useState([]);
  const [filterPlaces, setfilterPlaces] = useState([]);
  const [filterLocation, setfilterLocation] = useState([]);
  const [activeEventsArr, setActiveEventsArr] = useState([]);
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    const storedDate = getFromStorage('selectedDate');
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }
  }, [getFromStorage('selectedDate')]);

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
      setNoEvents(false);
    }
  }, [selectedDate, activeEvents]);

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

    // console.log(filteredEventsByPlaces);
    setfilterPlaces(filteredEventsByPlaces);

    const getLocation = getFromStorage('filterSelectedLocation');
    const filteredEventsByLocation = activeEvents.filter(
      event => event.location === getLocation
    );

    // console.log(filteredEventsByLocation);
    setfilterLocation(filteredEventsByLocation);
  }, [
    activeEvents,
    events,
    getFromStorage('filterSelectedLanguage'),
    getFromStorage('filterSelectedCategory'),
    getFromStorage('filterSelectedPlaces'),
    getFromStorage('filterSelectedLocation'),
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

  // const filteredList = activeEvents.filter(event => {
  //   return selectedDate.filter(
  //     filteredEvent => filteredEvent.eventId === event.article_event
  //   );
  // });

  // console.log('filteredList', filteredList);

  const languageFilterLength = filterLanguage.length;
  const categoryFilterLength = filterCategory.length;
  const placesFilterLength = filterPlaces.length;
  const locationFilterLength = filterLocation.length;
  // console.log(filterCategory);

  let filteredActiveEvents;

  if (languageFilterLength > 0) {
    filteredActiveEvents = activeEventsArr.filter(it =>
      filterLanguage.some(
        activeEvent => activeEvent.eventId === it.article_event
      )
    );
  }
  // else if (categoryFilterLength > 0) {
  //   filteredActiveEvents = filterCategory.filter(it =>
  //     activeEvents.some(ev => ev.eventId === it.article_event)
  //   );
  // }
  else if (filteredEvents.length > 0) {
    filteredActiveEvents = activeEventsArr.filter(it => {
      filteredEvents.filter(
        activeEvent => activeEvent.eventId === it.article_event
      );
    });
  } else if (placesFilterLength > 0) {
    filteredActiveEvents = activeEventsArr.filter(it =>
      filterPlaces.some(activeEvent => activeEvent.eventId === it.article_event)
    );
  } else if (locationFilterLength > 0) {
    filteredActiveEvents = activeEventsArr.filter(it =>
      filterLocation.some(
        activeEvent => activeEvent.eventId === it.article_event
      )
    );
  } else {
    const newFilteredWeek = activeEvents
      .filter(week =>
        currentWeek.some(
          day => new Date(week.date).toLocaleDateString() === day
        )
      )
      .filter(event => event.status === 'active');

    const res = activeEventsArr.filter(it =>
      newFilteredWeek.some(
        filteredEvent => filteredEvent.eventId === it.article_event
      )
    );
    filteredActiveEvents = res;
  }
  console.log(filteredEvents);

  const eventsToDisplay = filteredActiveEvents;
  // console.log(eventsToDisplay);
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
        {/* activeEventsArr
         */}
        {eventsToDisplay
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, eventsNumber)
          .map((event, i) => {
            // const newFilteredWeek = activeEvents
            //   .filter(week =>
            //     currentWeek.some(
            //       day => new Date(week.date).toLocaleDateString() === day
            //     )
            //   )
            //   .filter(event => event.status === 'active');

            // let newFilteredWeek = [];
            // activeEventsArr.map(it => {
            //   currentWeek.map(item => {
            //     if (new Date(it.date) - new Date(item) === 0) {
            //       newFilteredWeek.push(it);
            //     }
            //   });
            // });

            // const matchingActiveEvents = activeEvents.filter(
            //   activeEvent => activeEvent.eventId === event.article_event
            // );

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
  setCurrentWeek: PropTypes.any,
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

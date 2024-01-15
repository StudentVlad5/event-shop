import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BASE_URL_IMG } from 'helpers/constants';
import {
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
import { BtnLight, BtnLink } from 'components/baseStyles/Button.styled';
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
  const [currentWeek, setCurrentWeek] = useState([]);
  const [filterLanguage, setfilterLanguage] = useState([]);
  const [filterCategory, setfilterCategory] = useState([]);

  useEffect(() => {
    const storedDate = getFromStorage('selectedDate');
    if (storedDate) {
      setSelectedDate(new Date(storedDate));
    }

    const storedCurrentWeek = getFromStorage('currentWeek');
    if (storedCurrentWeek) {
      setCurrentWeek(
        storedCurrentWeek.map(dateStr => new Date(dateStr).toLocaleDateString())
      );
    }
  }, [getFromStorage('selectedDate'), getFromStorage('currentWeek')]);

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
  }, [
    activeEvents,
    events,
    getFromStorage('filterSelectedCategory'),
    getFromStorage('filterSelectedLanguage'),
  ]);

  const handleMouseEnter = eventId => {
    setHovered(eventId);
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

    setSelectedDate(null);
  };

  return (
    <>
      <CleanFilterBtn onClick={handleCleanFilter}>
        Очистити фільтри
      </CleanFilterBtn>
      <List>
        {events.slice(0, eventsNumber).map(event => {
          const newFilteredWeek = activeEvents.filter(week =>
            currentWeek.some(
              day => new Date(week.date).toLocaleDateString() === day
            )
          );
          console.log(newFilteredWeek);

          const matchingActiveEvents = activeEvents.filter(
            activeEvent => activeEvent.eventId === event.article_event
          );

          const filtredActiveEvents = filteredEvents.filter(
            activeEvent => activeEvent.eventId === event.article_event
          );

          const filtredActiveByLang = activeEvents.filter(
            activeEvent => activeEvent.eventId === event.article_event
          );

          let shouldDisplay;

          if (selectedDate) {
            // shouldDisplay = filtredActiveEvents?.length > 0;
            shouldDisplay = newFilteredWeek.length > 0;
          } else {
            // shouldDisplay = matchingActiveEvents?.length > 0;
            shouldDisplay = newFilteredWeek.some(
              filteredEvent => filteredEvent.eventId === event.article_event
            );
          }

          if (shouldDisplay) {
            return (
              <Event key={event._id}>
                <EventNavLink
                  onMouseEnter={() => handleMouseEnter(event._id)}
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

                  {isHovered === event._id && (
                    <EventDetailBox
                      $ishovered={isHovered === event._id ? 'flex' : 'none'}
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
                            {matchingActiveEvents.map((ev, idx) => (
                              <EventDetailDateText2 key={idx}>
                                {new Date(ev.date).toLocaleDateString()}
                              </EventDetailDateText2>
                            ))}
                          </EventDetailDateLi>
                        </EventDetailDate>

                        <ul>
                          <li>
                            <EventDetailDateText>
                              {t('Час')}
                            </EventDetailDateText>
                          </li>
                          <li>
                            {matchingActiveEvents.map((ev, idx) => (
                              <EventDetailDateText2 key={idx}>
                                {ev.time}
                              </EventDetailDateText2>
                            ))}
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
        {eventsNumber < events.length && (
          <BtnLight onClick={handleEventsNumber}>
            <span> {t('Показати більше')} </span>
          </BtnLight>
        )}
      </List>
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

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BASE_URL_IMG } from 'helpers/constants';
import {
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
} from './EventList.styled';
import defaultImg from 'images/No-image-available.webp';
import { useContext, useEffect, useState } from 'react';
import { BtnLight, BtnLink } from 'components/baseStyles/Button.styled';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { StatusContext } from 'components/ContextStatus/ContextStatus';

export const EventsList = ({ events }) => {
  const { t } = useTranslation();
  const [activeEvents, setActiveEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHovered, setHovered] = useState(null);
  // const today = new Date();
  // const activeEvents = events.filter(({ date }) => new Date(date) >= today);
  // const widthWindow = window.innerWidth;
  const { selectedLanguage } = useContext(StatusContext);
  const initialEvents = 6;
  const [eventsNumber, setEventsNumber] = useState(initialEvents);

  const handleMouseEnter = eventId => {
    setHovered(eventId);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/active_events`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }

        let langData = [];
        data.map(it => {
          let item = [
            {
              _id: it._id,
              article_eventID: it.article_eventID,
              eventId: it.eventId,
              date: it.date,
              time: it.time,
              ...it[selectedLanguage],
            },
          ];
          langData.push(item[0]);
        });
        setActiveEvents(langData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedLanguage]);

  const handleEventsNumber = () => {
    setEventsNumber(eventsNumber + 6);
  };

  return (
    <List>
      {events.map(event => {
        const matchingActiveEvents = activeEvents.filter(
          activeEvent => activeEvent.eventId === event.article_event
        );
        return (
          // data-aos="zoom-in-up" data-aos-delay="200"
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
                      event.image.split('/')[event.image.split('/').length - 1]
                    : defaultImg
                }
                alt={event.title}
                loading="lazy"
              />

              {isHovered === event._id && (
                <EventDetailBox>
                  <EventDetailTitle>{event.name}</EventDetailTitle>

                  <DetailsBox>
                    <EventDetailDate>
                      <EventDetailDateLi>
                        <EventDetailDateText>{t('Дата')}</EventDetailDateText>
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
                        <EventDetailDateText>{t('Час')}</EventDetailDateText>
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
      })}
      {eventsNumber < events.length && (
        <BtnLight onClick={handleEventsNumber}>
          <span> {t('Показати більше')} </span>
        </BtnLight>
      )}
    </List>
  );
};

EventsList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      language: PropTypes.string,
      image: PropTypes.string,
    })
  ),
};

import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { EventsList } from './EventsList/EventList';
import { ArchiveEventsList } from './ArchiveEventsList/ArchiveEventList';
import { fetchData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { EventsSection, Heading } from './Events.styled';
import { Container, Title } from 'components/baseStyles/CommonStyle.styled';
import { StatusContext } from 'components/ContextStatus/ContextStatus';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();

  // useEffect(() => {
  //   (async function getData() {
  //     setIsLoading(true);
  //     try {
  //       const { data } = await fetchData(`/events`);
  //       if (!data) {
  //         return onFetchError('Whoops, something went wrong');
  //       }

  //       // const langData = [
  //       //   ...new Set(
  //       //     data.map(item => item[selectedLanguage]).filter(item => item !== undefined),
  //       //   ),
  //       // ];

  //       let langData = [];
  //       data.map(it => {
  //         let item = [
  //           {
  //             _id: it._id,
  //             article_event: it.article_event,
  //             data: it.data,
  //             time: it.time,
  //             price: it.price,
  //             seats: it.seats,
  //             booking: it.booking,
  //             vacancies: it.vacancies,
  //             ...it[selectedLanguage],
  //           },
  //         ];
  //         langData.push(item[0]);
  //       });
  //       setEvents(langData);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [selectedLanguage]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3030/api/events');
        if (!response.ok) {
          return onFetchError('Whoops, something went wrong');
        }

        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);
  console.log(events);

  return (
    <EventsSection>
      <Container>
        <Title>{t('Events calendar')}</Title>

        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError('Whoops, something went wrong')}
        {events.length > 0 && !error && <EventsList events={events} />}

        {/* <Heading>{t('Archive of past events')}</Heading> */}
        {/* {isLoading ? onLoading() : onLoaded()} */}
        {/* {error && onFetchError('Whoops, something went wrong')} */}
        {/* {events.length > 0 && !error && <ArchiveEventsList events={events} />} */}
      </Container>
    </EventsSection>
  );
};

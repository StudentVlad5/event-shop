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
import Calendar from "./Calendar/calendar";
import Details from "./Calendar/details";


export const Events = () => {
  const [events, setEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();

  // useEffect(() => {
  //   (async function getData() {
  //     setIsLoading(true);
  //     try {
  //       const { data } = await fetchData(`/active_events`);
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
  //             // _id: it._id,
  //             // article_event: it.article_event,
  //             // date: it.date,
  //             // time: it.time,
  //             // name: it.name,
  //             // description: it.description,
  //             _id: it._id,
  //             article_eventID: it.article_eventID,
  //             eventId: it.eventId,
  //             date: it.date,
  //             time: it.time,
  //             price: it.price,
  //             seats: it.seats,
  //             booking: it.booking,
  //             vacancies: it.vacancies,
  //             language: it.language,
  //             language_secondary: it.language_secondary,
  //             location: it.location,
  //             ...it[selectedLanguage],
  //           },
  //         ];
  //         langData.push(item[0]);
  //       });
  //       setActiveEvents(langData);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [selectedLanguage]);

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/events`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }

        let langData = [];
        data.map(it => {
          let item = [
            {
              _id: it._id,
              article_event: it.article_event,
              name: it.name,
              description: it.description,
              image: it.image,
              ...it[selectedLanguage],
            },
          ];
          langData.push(item[0]);
        });
        setEvents(langData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedLanguage]);

  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <EventsSection>
      <Container>
        <Title>{t('Events calendar')}</Title>
        <Calendar showDetailsHandle={showDetailsHandle} />
        <br />
        {showDetails && <Details data={data} />}
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError('Whoops, something went wrong')}
        {/* && activeEvents.length  activeEvents={activeEvents}*/}
        {events.length > 0 && !error && <EventsList events={events} />}

        {/* <Heading>{t('Archive of past events')}</Heading> */}
        {/* {isLoading ? onLoading() : onLoaded()} */}
        {/* {error && onFetchError('Whoops, something went wrong')} */}
        {/* {events.length > 0 && !error && <ArchiveEventsList events={events} />} */}
      </Container>
    </EventsSection>
  );
};

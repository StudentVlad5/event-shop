import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { EventsList } from './EventsList/EventList';
import { fetchData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { EventsSection } from './Events.styled';
import { Container, Title } from 'components/baseStyles/CommonStyle.styled';
import { StatusContext } from 'components/ContextStatus/ContextStatus';
import Calendar from './Calendar/calendar';
import Details from './Calendar/details';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();

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

  const showDetailsHandle = dayStr => {
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

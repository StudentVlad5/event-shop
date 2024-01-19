import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { SEO } from 'utils/SEO';
import { EventDetails } from 'components/Events/EventDetails/EventDetails';
import { StatusContext } from 'components/ContextStatus/ContextStatus';

const EventDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const routeParams = useParams();
  const { selectedLanguage } = useContext(StatusContext);
  const [activeEvents, setActiveEvents] = useState([]);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/active_events/${routeParams.id}`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }

        const langData = [
          {
            _id: data._id,
            article_eventID: data.article_eventID,
            eventId: data.eventId,
            date: data.date,
            time: data.time,
            price: data.price,
            seats: data.seats,
            booking: data.booking,
            vacancies: data.vacancies,
            language: data.language,
            language_secondary: data.language_secondary,
            language_third: data.language_third,
            location: data.location,
            address: data.address,
            status: data.status,
            ...data[selectedLanguage],
          },
        ];
        setActiveEvents(langData[0]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (routeParams.id !== '' && routeParams !== undefined) {
      getData();
    }
  }, [routeParams.id]);

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return (
    <>
      <SEO title="Event" description="Event details" />
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError('Whoops, something went wrong')}
      {Object.keys(activeEvents).length > 0 && !error && (
        <EventDetails activeEvents={activeEvents} />
      )}
    </>
  );
};

export default EventDetailsPage;

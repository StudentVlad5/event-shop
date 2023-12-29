import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from 'services/APIservice';
import { getFromStorage } from 'services/localStorService';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { SEO } from 'utils/SEO';
import { EventDetails } from 'components/Events/EventDetails/EventDetails';

const EventDetailsPage = () => {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const routeParams = useParams();

  const [lang, setLang] = useState(getFromStorage('chosenLanguage') || 'fr');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/events/${routeParams.id}`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        const langData = [
          {
            _id: data._id,
            article_event: data.article_event,
            data: data.data,
            time: data.time,
            price: data.price,
            seats: data.seats,
            booking: data.booking,
            vacancies: data.vacancies,
            ...data[lang],
          },
        ];
        setEvent(langData[0]);
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
      {Object.keys(event).length > 0 && !error && (
        <EventDetails event={event} />
      )}
    </>
  );
};

export default EventDetailsPage;

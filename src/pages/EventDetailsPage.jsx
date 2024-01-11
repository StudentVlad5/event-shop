import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from 'services/APIservice';
import { getFromStorage } from 'services/localStorService';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { SEO } from 'utils/SEO';
import { EventDetails } from 'components/Events/EventDetails/EventDetails';
import { StatusContext } from 'components/ContextStatus/ContextStatus';

const EventDetailsPage = () => {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const routeParams = useParams();
  const [activeEvents, setActiveEvents] = useState([]);

  const { selectedLanguage } = useContext(StatusContext);

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
            name: data.name,
            description: data.description,
            duration: data.duration,
            rating: data.rating,
            category: data.category,
            category_second: data.category_second,
            category_third: data.category_third,
            specialistId: data.specialistId,
            image: data.image,
            image_1: data.image_1,
            image_2: data.image_2,
            ...data[selectedLanguage],
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
  console.log(event);

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

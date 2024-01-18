import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from 'services/APIservice';
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
  const { selectedLanguage } = useContext(StatusContext);
  const [articleEventID , setArticleEventID ] = useState([]);
  const [article_event, setArticleEvent] = useState(null)
  
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
        setArticleEvent(data.article_event)

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
              // language: it.language,
              // language_secondary: it.language_secondary,
              // language_third: it.language_third,
              // status: it.status,
              // vacancies: it.vacancies,
              // location: it.location,
              ...it[selectedLanguage],
            },
          ];
          langData.push(item[0]);
        });
        setArticleEventID(langData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedLanguage]);
  
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return (
    <>
      <SEO title="Event" description="Event details" />
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError('Whoops, something went wrong')}
      {Object.keys(event).length > 0 && !error && (
        <EventDetails articleEventID={articleEventID} event={event} />
      )}
    </>
  );
};

export default EventDetailsPage;

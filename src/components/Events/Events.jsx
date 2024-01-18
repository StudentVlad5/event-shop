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
import { Filters } from './Filters/Filters';
import { getFromStorage } from "services/localStorService";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(getFromStorage('currentWeek')?getFromStorage('currentWeek'):[]);
  const [selectedDate, setSelectedDate] = useState(getFromStorage('selectedDate')? new Date(getFromStorage('selectedDate')) : null);
  const [selectedLanguages, setSelectedLanguages] = useState(getFromStorage('filterSelectedLanguages')? getFromStorage('filterSelectedLanguages') : []);
  const [selectedCategories, setSelectedCategories] = useState(getFromStorage('filterSelectedCategories')? getFromStorage('filterSelectedCategories') : []);
  const [selectedLocations, setSelectedLocations] = useState(getFromStorage('filterSelectedLocation')? getFromStorage('filterSelectedLocation') : []);
  const [selectedPlaces, setSelectedPlaces] = useState(getFromStorage('filterSelectedPlaces')? getFromStorage('filterSelectedPlaces') : '');




  const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();
  const [activeEvents, setActiveEvents] = useState([]);

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
              category: it.category,
              category_second: it.category_second,
              category_third: it.category_third,
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
              language: it.language,
              language_secondary: it.language_secondary,
              language_third: it.language_third,
              status: it.status,
              vacancies: it.vacancies,
              location: it.location,
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

  const showDetailsHandle = dayStr => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <EventsSection>
      <Container>
        <Title>{t('Events calendar')}</Title>
        <Calendar
          showDetailsHandle={showDetailsHandle}
          currentWeek={currentWeek}
          selectedDate={selectedDate}
          setCurrentWeek={setCurrentWeek}
          setSelectedDate={setSelectedDate}
        />
        <Filters 
        activeEvents={activeEvents} 
        setSelectedLanguages={setSelectedLanguages}
        setSelectedCategories={setSelectedCategories}
        setSelectedLocations={setSelectedLocations} 
        setSelectedPlaces={setSelectedPlaces}
        selectedLanguages={selectedLanguages}
        selectedCategories={selectedCategories}
        selectedLocations={selectedLocations} 
        selectedPlaces={selectedPlaces}
        />
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError('Whoops, something went wrong')}
        {events.length > 0 && !error && (
          <EventsList
            events={events}
            activeEvents={activeEvents}
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
            selectedDate = {selectedDate}
            setSelectedDate = {setSelectedDate}
            selectedLanguages={selectedLanguages}
            selectedCategories={selectedCategories} 
            selectedLocations={selectedLocations} 
            selectedPlaces={selectedPlaces}
            setSelectedLanguages={setSelectedLanguages}
            setSelectedCategories={setSelectedCategories}
            setSelectedLocations={setSelectedLocations}
            setSelectedPlaces={setSelectedPlaces}
          />
        )}
      </Container>
    </EventsSection>
  );
};

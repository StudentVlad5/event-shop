import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BASE_URL_IMG } from 'helpers/constants';
import {
  BtnLightEvents,
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
import { BtnLink } from 'components/baseStyles/Button.styled';
import { removeItem } from 'services/localStorService';

export const EventsList = ({
  events,
  activeEvents,
  currentWeek,
  selectedDate,
  setSelectedDate,
  selectedLanguages,
  selectedCategories,
  selectedLocations,
  selectedPlaces,
  setSelectedLanguages,
  setSelectedCategories,
  setSelectedLocations,
  setSelectedPlaces,
}) => {
  const { t } = useTranslation();
  const [isHovered, setHovered] = useState(null);
  const initialEvents = 6;
  const [eventsNumber, setEventsNumber] = useState(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);
  const [activeEventsArr, setActiveEventsArr] = useState([]);
  const [activeFilteredEvents, setActiveFilteredEvents] = useState([]);

  const handleMouseEnter = i => {
    setHovered(i);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleEventsNumber = () => {
    setEventsNumber(eventsNumber + 6);
  };

  const handleCleanFilter = () => {
    removeItem('selectedDate');
    removeItem('filterSelectedLanguages');
    removeItem('filterSelectedCategories');
    removeItem('filterSelectedPlaces');
    removeItem('filterSelectedLocation');

    setSelectedDate(null);
    setSelectedLanguages([]);
    setSelectedCategories([]);
    setSelectedPlaces('');
    setSelectedLocations([]);
  };

  useEffect(() => {
    const newFilteredWeek = activeEvents
      .filter(week =>
        currentWeek.some(
          day => new Date(week.date).toLocaleDateString() === day
        )
      )
      .filter(event => event.status === 'active');
    let array = [];
    newFilteredWeek.map(it => {
      events.map(item => {
        if (it.eventId === item.article_event && it.status === 'active') {
          let data = {};
          (data._id = it._id),
            (data.article_event = item.article_event),
            (data.language = it.language),
            (data.language_secondary = it.language_secondary),
            (data.language_third = it.language_third),
            (data.price = it.price),
            (data.date = it.date),
            (data.time = it.time),
            (data.location = it.location),
            (data.address = it.address),
            (data.seats = it.seats),
            (data.booking = it.booking),
            (data.vacancies = it.vacancies),
            (data.image = item.image),
            (data.image_1 = item.image_1),
            (data.image_2 = item.image_2),
            (data.rating = item.rating),
            (data.duration = item.duration),
            (data.category = item.category),
            (data.category_second = item.category_second),
            (data.category_third = item.category_third),
            (data.specialistId = item.specialistId),
            (data.description = item.description),
            (data.name = item.name),
            (data.status = item.status),
            array.push(data);
        }
      });
    });
    setActiveEventsArr(array);
    if (selectedDate) {
      const newFilteredEvents = activeEventsArr.filter(
        event =>
          new Date(event.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      );
      setFilteredEvents(newFilteredEvents);
      setActiveFilteredEvents(newFilteredEvents);
      setNoEvents(newFilteredEvents.length === 0);
    } else {
      setFilteredEvents(array);
      setActiveFilteredEvents(array);
      setNoEvents(false);
    }
  }, [activeEvents, events, currentWeek, selectedDate]);

  useEffect(() => {
    let ARR_L = [];
    if (selectedLanguages.length > 0) {
      let lab = [];
      filteredEvents.map(it => {
        selectedLanguages.map(activeEvent => {
          if (
            activeEvent === it.language ||
            activeEvent === it.language_secondary ||
            activeEvent === it.language_third
          ) {
            lab.push(it);
          }
        });
      });
      const res = lab.reduce((o, i) => {
        if (!o.find(v => v._id == i._id)) {
          o.push(i);
        }
        return o;
      }, []);
      ARR_L = res.map(it => it);
    } else {
      ARR_L = filteredEvents.map(it => it);
    }

    let ARR_C = [];
    if (selectedCategories.length > 0) {
      let lab = [];
      ARR_L.map(it => {
        selectedCategories.map(activeEvent => {
          if (
            activeEvent === it.category ||
            activeEvent === it.category_secondary ||
            activeEvent === it.category_third
          ) {
            lab.push(it);
          }
        });
      });
      const res = lab.reduce((o, i) => {
        if (!o.find(v => v._id == i._id)) {
          o.push(i);
        }
        return o;
      }, []);
      ARR_C = res.map(it => it);
    } else {
      ARR_C = ARR_L.map(it => it);
    }

    let ARR_Loc = [];
    if (selectedLocations.length > 0) {
      let lab = [];
      ARR_C.map(it => {
        selectedLocations.map(activeEvent => {
          if (activeEvent === it.location) {
            lab.push(it);
          }
        });
      });
      const res = lab.reduce((o, i) => {
        if (!o.find(v => v._id == i._id)) {
          o.push(i);
        }
        return o;
      }, []);
      ARR_Loc = res.map(it => it);
    } else {
      ARR_Loc = ARR_C.map(it => it);
    }

    let ARR_P = [];
    if (selectedPlaces === 'yes') {
      let lab = [];
      ARR_Loc.map(it => {
        if (it.vacancies > 0) {
          lab.push(it);
        }
      });
      const res = lab.reduce((o, i) => {
        if (!o.find(v => v._id == i._id)) {
          o.push(i);
        }
        return o;
      }, []);
      ARR_P = res.map(it => it);
    } else if (selectedPlaces === 'no') {
      let lab = [];
      ARR_Loc.map(it => {
        if (it.vacancies <= 0) {
          lab.push(it);
        }
      });
      const res = lab.reduce((o, i) => {
        if (!o.find(v => v._id == i._id)) {
          o.push(i);
        }
        return o;
      }, []);
      ARR_P = res.map(it => it);
    } else {
      ARR_P = ARR_Loc.map(it => it);
    }

    setActiveFilteredEvents(ARR_P);
  }, [
    selectedLanguages,
    selectedCategories,
    selectedLocations,
    selectedPlaces,
  ]);

  return (
    <>
      <CleanFilterBtn onClick={handleCleanFilter}>
        {t('Enlever les filtres')}
      </CleanFilterBtn>
      {noEvents && (
        <NoEvents>
          {/* {t('Pour cette date')} {new Date(selectedDate).toLocaleDateString()} */}
          {t("Il n'y a pas des evenements")}
        </NoEvents>
      )}
      <List>
        {activeFilteredEvents
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, eventsNumber)
          .map((event, i) => {
            return (
              <Event key={i}>
                <EventNavLink
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <EventImages
                    src={
                      event.image
                        ? BASE_URL_IMG +
                          event.image.split('/')[
                            event.image.split('/').length - 1
                          ]
                        : defaultImg
                    }
                    alt={event.title}
                    loading="lazy"
                  />

                  {isHovered === i && (
                    <EventDetailBox
                      $ishovered={isHovered === i ? 'flex' : 'none'}
                    >
                      <EventDetailTitle>{event.name}</EventDetailTitle>

                      <DetailsBox>
                        <EventDetailDate>
                          <EventDetailDateLi>
                            <EventDetailDateText>
                              {t('Date')}
                            </EventDetailDateText>
                          </EventDetailDateLi>
                          <EventDetailDateLi>
                            <EventDetailDateText2>
                              {new Date(event.date).toLocaleDateString()}
                            </EventDetailDateText2>
                          </EventDetailDateLi>
                        </EventDetailDate>

                        <ul>
                          <li>
                            <EventDetailDateText>
                              {t('Heure')}
                            </EventDetailDateText>
                          </li>
                          <li>
                            <EventDetailDateText2>
                              {event.time}
                            </EventDetailDateText2>
                          </li>
                        </ul>
                      </DetailsBox>

                      <DetailsBoxDiscr>
                        {event.description.length > 50
                          ? event.description.slice(0, 50) + ' ...'
                          : event.description}
                      </DetailsBoxDiscr>

                      <BtnLink to={`/events/${event._id}`}>
                        <span>{t('Suivant')}</span>
                      </BtnLink>
                    </EventDetailBox>
                  )}
                </EventNavLink>
              </Event>
            );
          })}
      </List>
      {eventsNumber < activeFilteredEvents.length && (
        <BtnLightEvents onClick={handleEventsNumber}>
          <span> {t('Voir plus')} </span>
        </BtnLightEvents>
      )}
    </>
  );
};

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})),
  currentWeek: PropTypes.any,
  selectedDate: PropTypes.any,
  setSelectedDate: PropTypes.any,
  selectedLanguages: PropTypes.any,
  selectedCategories: PropTypes.any,
  selectedLocations: PropTypes.any,
  selectedPlaces: PropTypes.any,
  setSelectedLanguages: PropTypes.any,
  setSelectedCategories: PropTypes.any,
  setSelectedLocations: PropTypes.any,
  setSelectedPlaces: PropTypes.any,
  activeEvents: PropTypes.arrayOf(PropTypes.shape({})),
};

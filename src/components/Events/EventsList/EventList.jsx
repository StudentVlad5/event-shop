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
import { BtnLink } from 'components/Team/Team.styled';
import defaultImg from 'images/No-image-available.webp';
import { useState } from 'react';

export const EventsList = ({ events }) => {
  const { t } = useTranslation();

  const [isHovered, setHovered] = useState(null);
  // const today = new Date();
  // const activeEvents = events.filter(({ date }) => new Date(date) >= today);
  const widthWindow = window.innerWidth;

  const handleMouseEnter = eventId => {
    setHovered(eventId);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <>
    <div>Calendar</div>

    <div>Filtr</div>
      <List>
        {events.map(event => {
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
                        event.image.split('/')[
                          event.image.split('/').length - 1
                        ]
                      : defaultImg
                  }
                  alt={event.title}
                  loading="lazy"
                />

                {isHovered === event._id && (
                  <EventDetailBox>
                    <EventDetailTitle>Title</EventDetailTitle>

                    <DetailsBox>
                      <EventDetailDate>
                        <EventDetailDateLi>
                          <EventDetailDateText>Дата</EventDetailDateText>
                        </EventDetailDateLi>
                        <EventDetailDateLi>
                          <EventDetailDateText2>
                            16.01.2024
                          </EventDetailDateText2>
                        </EventDetailDateLi>
                      </EventDetailDate>

                      <ul>
                        <li>
                          <EventDetailDateText>Час</EventDetailDateText>
                        </li>
                        <li>
                          <EventDetailDateText2>19:00</EventDetailDateText2>
                        </li>
                      </ul>
                    </DetailsBox>

                    <DetailsBoxDiscr>
                      {event.fr.description.length > 50
                        ? event.fr.description.slice(0, 50) + ' ...'
                        : event.fr.description}
                    </DetailsBoxDiscr>

                    <BtnLink to={`/events/${event._id}`}>
                      <span>{t('Детальніше')}</span>
                    </BtnLink>
                  </EventDetailBox>
                )}
              </EventNavLink>
            </Event>
          );
        })}
      </List>
    </>
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

{
  /* <DetailsWrapper>
<DataPlaceWrapper>
  <EventDate>
    {new Date(event.date).toLocaleDateString()} | {event.time}
  </EventDate>
  <EventDate>{event.location}</EventDate>
</DataPlaceWrapper>
<EventTitle>{event.title}</EventTitle>
{widthWindow && (
  <EventDesc>
    {/* {event.description.length > 300
      ? event.description.slice(0, 300) + ' ...'
      : event.description} */
}
// {event.fr.description}
// </EventDesc>
// )}
{
  /* <BtnLink to={`/events/${event._id}`}> */
}
// <span>{t('More')}</span>
// </BtnLink>
// </DetailsWrapper> */}

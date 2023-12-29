import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BASE_URL_IMG } from 'helpers/constants';
import {
  BtnLink,
  DataPlaceWrapper,
  DetailsWrapper,
  Event,
  EventDate,
  EventDesc,
  EventImages,
  EventNavLink,
  EventTitle,
  List,
} from './EventList.styled';
import defaultImg from 'images/events/default.jpg';

export const EventsList = ({ events }) => {
  const { t } = useTranslation();

  const today = new Date();
  const activeEvents = events.filter(({ date }) => new Date(date) >= today);
  const widthWindow = window.innerWidth;

  return (
    <List>
      {activeEvents.map(event => {
        return (
          <Event key={event._id} data-aos="zoom-in-up" data-aos-delay="200">
            <EventNavLink to={`/events/${event._id}`}>
              <EventImages
                src={
                  event.image
                    ? BASE_URL_IMG +
                      event.image.split('/')[event.image.split('/').length - 1]
                    : defaultImg
                }
                alt={event.title}
                width="325"
                height="322"
                loading="lazy"
              />
            </EventNavLink>
            <DetailsWrapper>
              <DataPlaceWrapper>
                <EventDate>
                  {new Date(event.date).toLocaleDateString()} | {event.time}
                </EventDate>
                <EventDate>{event.location}</EventDate>
              </DataPlaceWrapper>
              <EventTitle>{event.title}</EventTitle>
              {widthWindow && (
                <EventDesc>
                  {event.description.length > 300
                    ? event.description.slice(0, 300) + ' ...'
                    : event.description}
                </EventDesc>
              )}
              <BtnLink to={`/events/${event._id}`}>
                <span>{t('More')}</span>
              </BtnLink>
            </DetailsWrapper>
          </Event>
        );
      })}
    </List>
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
      image: PropTypes.string,
    })
  ),
};

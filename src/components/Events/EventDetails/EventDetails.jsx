import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addModal } from 'redux/modal/operation';
import { openModalWindow } from 'hooks/modalWindow';
import { Container } from 'components/baseStyles/CommonStyle.styled';
import { BackButton } from 'helpers/BackLink/BackLink';
import { BtnLight } from 'components/baseStyles/Button.styled';
import { RegisterModal } from '../RegisterModal/RegisterModal';
import { BASE_URL_IMG } from 'helpers/constants';
import defaultImg from 'images/events/default.jpg';
import { EventsSection } from '../Events.styled';
import {
  EventDescr,
  EventDescrBox,
  EventHeading,
  EventImage,
  EventTextWrapper,
  EventTitle,
  HeadingItem,
  HeadingItemData,
  HeadingItemTitle,
} from './EventDetails.styled';
import { useTranslation } from 'react-i18next';

export const EventDetails = ({ event }) => {
  const { date, time, duration, location, title, description, image } = event;

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const openModal = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.dataset.modal === 'event') {
      dispatch(
        addModal({
          modal: e.currentTarget.dataset.modal,
        })
      );
      setTimeout(() => openModalWindow(e, null), 200);
    }
  };

  return (
    <>
      <EventsSection>
        <Container>
          <EventTitle>
            {new Date(date).toLocaleDateString()} | {title}
          </EventTitle>
          <BackButton to="/events">{t('Back')}</BackButton>
          <EventHeading>
            <HeadingItem>
              <HeadingItemTitle>{t('Date')}</HeadingItemTitle>
              <HeadingItemData>
                {new Date(date).toLocaleDateString()}
              </HeadingItemData>
            </HeadingItem>
            <HeadingItem>
              <HeadingItemTitle>{t('Start at')}</HeadingItemTitle>
              <HeadingItemData>{time}</HeadingItemData>
            </HeadingItem>
            <HeadingItem>
              <HeadingItemTitle>{t('Location')}</HeadingItemTitle>
              <HeadingItemData>{location}</HeadingItemData>
            </HeadingItem>
          </EventHeading>
          <EventImage
            src={
              image
                ? BASE_URL_IMG + image.split('/')[image.split('/').length - 1]
                : defaultImg
            }
            alt={title}
            width="325"
            height="322"
            loading="lazy"
          />
          <EventTextWrapper>
            <EventDescrBox>
              <EventDescr>
                {t('Duration of the event')}: {duration}
              </EventDescr>
            </EventDescrBox>
            <EventDescrBox>
              <EventDescr>{description}</EventDescr>
            </EventDescrBox>
          </EventTextWrapper>
          <BtnLight
            type="button"
            aria-label="Register"
            onClick={e => {
              openModal(e);
            }}
            data-modal="event"
          >
            {t('Register')}
          </BtnLight>
        </Container>
      </EventsSection>
      <RegisterModal event={event} />
    </>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};

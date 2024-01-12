import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addModal } from '../../../redux/modal/operation';
import { openModalWindow } from 'hooks/ModalWindow';
import { BackButton } from 'helpers/BackLink/BackLink';
import { BASE_URL, BASE_URL_IMG } from 'helpers/constants';
import { EventsSection } from '../Events.styled';
import { RegisterModal } from '../RegisterModal/RegisterModal';
import { Container } from 'components/baseStyles/CommonStyle.styled';
import { BtnLight } from 'components/baseStyles/Button.styled';
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
import defaultImg from 'images/No-image-available.webp';
import { useContext, useEffect, useState } from 'react';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { getFromStorage } from 'services/localStorService';
import { StatusContext } from 'components/ContextStatus/ContextStatus';

export const EventDetails = ({ event }) => {
  const {
    article_event,
    specialistId,
    name,
    description,
    duration,
    rating,
    category,
    category_second,
    category_third,
    image,
    image_1,
    image_2,
  } = event;

  const { t } = useTranslation();
  const { selectedLanguage } = useContext(StatusContext);
  const [activeEvents, setActiveEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [specialist, setSpecialist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/active_events`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }

        let langData = [];
        data
          .filter(item => item.eventId === article_event)
          .map(it => {
            let item = [
              {
                _id: it._id,
                article_eventID: it.article_eventID,
                eventId: it.eventId,
                date: it.date,
                time: it.time,
                price: it.price,
                seats: it.seats,
                booking: it.booking,
                vacancies: it.vacancies,
                language: it.language,
                language_secondary: it.language_secondary,
                location: it.location,
                address: it.address,
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

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/categories`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }

        let langData = [];
        data
          .filter(item => item.categoryId === category)
          .map(it => {
            let item = [
              {
                _id: it._id,
                categoryId: it.categoryId,
                title: it.title,
                ...it[selectedLanguage],
              },
            ];
            langData.push(item[0]);
          });
        setCategories(langData);
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
        const { data } = await fetchData(`/specialists`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }

        let langData = [];
        data
          .filter(item => item.specialistId === specialistId)
          .map(it => {
            let item = [
              {
                _id: it._id,
                specialistId: it.specialistId,
                name: it.name,
                ...it[selectedLanguage],
              },
            ];
            langData.push(item[0]);
          });
        setSpecialist(langData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedLanguage]);

  return (
    <>
      <EventsSection>
        <Container>
          <EventTitle>{name}</EventTitle>
          <BackButton to="/events">{t('Back')}</BackButton>
          <EventHeading>
            <HeadingItem>
              <HeadingItemTitle>{t('дата')}</HeadingItemTitle>
              {activeEvents.map((ev, idx) => (
                <HeadingItemData key={idx}>
                  {new Date(ev.date).toLocaleDateString()}
                </HeadingItemData>
              ))}
            </HeadingItem>
            <HeadingItem>
              <HeadingItemTitle>{t('час')}</HeadingItemTitle>
              {activeEvents.map((ev, idx) => (
                <HeadingItemData key={idx}>{ev.time}</HeadingItemData>
              ))}
            </HeadingItem>
            <HeadingItem>
              <HeadingItemTitle>{t('тривалість')}</HeadingItemTitle>
              <HeadingItemData>{duration}</HeadingItemData>
            </HeadingItem>
            <HeadingItem>
              <HeadingItemTitle>{t('місце')}</HeadingItemTitle>
              {activeEvents.map((ev, idx) => (
                <HeadingItemData key={idx}>
                  {ev.location} <br /> <br /> {ev.address}
                </HeadingItemData>
              ))}
            </HeadingItem>
          </EventHeading>
          <EventImage
            src={
              image
                ? BASE_URL_IMG + image.split('/')[image.split('/').length - 1]
                : defaultImg
            }
            alt={name}
            loading="lazy"
          />
          <EventHeading>
            <HeadingItem>
              <HeadingItemTitle>{t('категорія')}</HeadingItemTitle>
              <HeadingItemData>
                {categories.map((ct, idx) => (
                  <HeadingItemData key={idx}>{ct.title}</HeadingItemData>
                ))}
              </HeadingItemData>
            </HeadingItem>
            <HeadingItem>
              <HeadingItemTitle>{t('Мова')}</HeadingItemTitle>
              {activeEvents.map((ev, idx) => (
                <HeadingItemData key={idx}>{ev.language}</HeadingItemData>
              ))}
            </HeadingItem>
            <HeadingItem>
              <HeadingItemTitle>
                {t('кількість вільних місць')}
              </HeadingItemTitle>
              {activeEvents.map((ev, idx) => (
                <HeadingItemData key={idx}>
                  {ev.vacancies}/{ev.seats}
                </HeadingItemData>
              ))}
            </HeadingItem>
            <HeadingItem>
              <HeadingItemTitle>{t('ціна')}</HeadingItemTitle>
              {activeEvents.map((ev, idx) => (
                <HeadingItemData key={idx}>{ev.price}</HeadingItemData>
              ))}
            </HeadingItem>
          </EventHeading>
          <EventTextWrapper>
            <EventDescrBox>
              <EventDescr>{description}</EventDescr>
            </EventDescrBox>

            <EventDescrBox>
              {specialist.map((sp, idx) => (
                <EventDescr key={idx}>{sp.name}</EventDescr>
              ))}
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
    article_event: PropTypes.string,
    specialistId: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    rating: PropTypes.number,
    category: PropTypes.string,
    category_second: PropTypes.string,
    image: PropTypes.string,
    category_third: PropTypes.string,
    image_1: PropTypes.string,
    image_2: PropTypes.string,
  }),
};
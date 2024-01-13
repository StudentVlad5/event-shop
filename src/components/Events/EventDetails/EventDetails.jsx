import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addModal } from '../../../redux/modal/operation';
import { openModalWindow } from 'hooks/ModalWindow';
import { BASE_URL_IMG } from 'helpers/constants';
import { EventsSection } from '../Events.styled';
import { RegisterModal } from '../RegisterModal/RegisterModal';
import { Container } from 'components/baseStyles/CommonStyle.styled';
import { BtnLight } from 'components/baseStyles/Button.styled';
import {
  BtnBack,
  EventDescr,
  EventDescrBox,
  EventDescrBoxTitle,
  EventHeading,
  EventHeading2,
  EventImage,
  EventTextWrapper,
  EventTitle,
  HeadingItem,
  HeadingItemData,
  HeadingItemDataBox,
  HeadingItemTitle,
  ImgBthBox,
  InfoBox,
  NavLinkSpecialist,
} from './EventDetails.styled';
import defaultImg from 'images/No-image-available.webp';
import { useContext, useEffect, useState } from 'react';
import { fetchData } from 'services/APIservice';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { StatusContext } from 'components/ContextStatus/ContextStatus';
import { BtnPagination } from 'components/Home/TopSpecialists/TopSpecialists.styled';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import 'swiper/css';
import { HiArrowLeft } from 'react-icons/hi';

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
                language_third: it.language_third,
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
          .filter(
            item =>
              item.categoryId === category ||
              item.categoryId === category_second ||
              item.categoryId === category_third
          )
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

  const goBack = () => {
    window.history.back();
  };

  const images = [image, image_1, image_2].filter(Boolean);
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage(prevEL => (prevEL === 0 ? images.length - 1 : prevEL - 1));
  };

  const handleNext = () => {
    setCurrentImage(prevEL => (prevEL === images.length - 1 ? 0 : prevEL + 1));
  };

  return (
    <>
      <EventsSection>
        <Container>
          <EventTitle>{name}</EventTitle>
          <BtnBack type="button" onClick={goBack}>
            <HiArrowLeft size={16} />
            Назад
          </BtnBack>
          <InfoBox>
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

            {images.map((image, idx) => (
              <EventImage
                key={idx}
                src={
                  image
                    ? BASE_URL_IMG +
                      'events/' +
                      image.split('/')[image.split('/').length - 1]
                    : defaultImg
                }
                alt={event.name}
                loading="lazy"
                style={{
                  display: idx === currentImage ? 'block' : 'none',
                }}
              />
            ))}

            <EventHeading2>
              <HeadingItem>
                <HeadingItemTitle>{t('категорія')}</HeadingItemTitle>
                {categories.map((ct, idx) => (
                  <>
                    <HeadingItemData key={idx}>{ct.title}</HeadingItemData>
                  </>
                ))}
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>{t('Мова')}</HeadingItemTitle>
                {activeEvents.map((ev, idx) => (
                  <HeadingItemDataBox key={idx}>
                    <HeadingItemData style={{ marginRight: 5 }}>
                      {ev.language}
                    </HeadingItemData>
                    <HeadingItemData>{ev.language_secondary}</HeadingItemData>
                    <HeadingItemData>{ev.language_third}</HeadingItemData>
                  </HeadingItemDataBox>
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
            </EventHeading2>
          </InfoBox>

          {images.length > 1 && (
            <ImgBthBox>
              <BtnPagination onClick={handlePrev}>
                <MdKeyboardArrowLeft size={30} />
              </BtnPagination>

              <BtnPagination onClick={handleNext}>
                <MdKeyboardArrowRight size={30} />
              </BtnPagination>
            </ImgBthBox>
          )}

          <EventTextWrapper>
            <EventDescrBox>
              <EventDescr>{description}</EventDescr>
            </EventDescrBox>

            <EventDescrBox>
              <EventDescrBoxTitle>Спеціаліст</EventDescrBoxTitle>
              {specialist.map((sp, idx) => (
                <NavLinkSpecialist
                  to={`/specialists/${sp.specialistId}`}
                  key={idx}
                >
                  <span>{sp.name}</span>
                </NavLinkSpecialist>
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
      <RegisterModal event={event} activeEvents={activeEvents} />
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

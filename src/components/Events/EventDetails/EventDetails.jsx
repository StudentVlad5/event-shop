import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addModal } from '../../../redux/modal/operation';
import { openModalWindow } from 'hooks/ModalWindow';
import { BASE_URL_IMG } from 'helpers/constants';
import { EventsSection } from '../Events.styled';
import { RegisterModal } from '../RegisterModal/RegisterModal';
import { Container } from 'components/baseStyles/CommonStyle.styled';
import { BtnAccent } from 'components/baseStyles/Button.styled';
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

export const EventDetails = ({ activeEvents }) => {
  const {
    _id,
    article_eventID,
    eventId,
    date,
    time,
    price,
    seats,
    booking,
    vacancies,
    language,
    language_secondary,
    language_third,
    location,
    address,
    status,
  } = activeEvents;

  const { t } = useTranslation();
  const { selectedLanguage } = useContext(StatusContext);
  const [categories, setCategories] = useState([]);
  const [specialist, setSpecialist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState();
  const [images, setImages] = useState([]);

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
        const { data } = await fetchData(`/events`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }

        let langData = [];
        data
          .filter(item => item.article_event === eventId)
          .map(it => {
            let item = [
              {
                _id: it._id,
                article_event: it.article_event,
                name: it.name,
                description: it.description,
                duration: it.duration,
                rating: it.rating,
                category: it.category,
                category_second: it.category_second,
                category_third: it.category_third,
                specialistId: it.specialistId,
                image: it.image,
                image_1: it.image_1,
                image_2: it.image_2,
                ...it[selectedLanguage],
              },
            ];
            langData.push(item[0]);
          });
        setEvents(langData);

        const imagesArray = [
          langData[0].image,
          langData[0].image_1,
          langData[0].image_2,
        ];
        const isImages = imagesArray.filter(image => image !== '');

        setImages(isImages);
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
        data.map(it => {
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
          {events &&
            events.map((ev, idx) => (
              <EventTitle key={idx + ev.name}>{ev.name}</EventTitle>
            ))}
          <BtnBack type="button" onClick={goBack}>
            <HiArrowLeft size={16} />
            {t('Назад')}
          </BtnBack>
          <InfoBox>
            <EventHeading>
              <HeadingItem>
                <HeadingItemTitle>{t('дата')}</HeadingItemTitle>
                <HeadingItemData>
                  {new Date(date).toLocaleDateString()}
                </HeadingItemData>
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>{t('час')}</HeadingItemTitle>
                <HeadingItemData>{time}</HeadingItemData>
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>{t('тривалість')}</HeadingItemTitle>
                {events &&
                  events.map((ev, idx) => (
                    <HeadingItemData key={idx + ev.duration}>
                      {ev.duration}
                    </HeadingItemData>
                  ))}
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>{t('місце')}</HeadingItemTitle>
                <HeadingItemData>
                  {location} <br /> <br /> {address}
                </HeadingItemData>
              </HeadingItem>
            </EventHeading>

            {images.map((image, idx) => (
              <EventImage
                key={idx + idx}
                src={
                  image
                    ? BASE_URL_IMG +
                      'events/' +
                      image.split('/')[image.split('/').length - 1]
                    : defaultImg
                }
                alt={events.name}
                loading="lazy"
                style={{
                  display: idx === currentImage ? 'block' : 'none',
                }}
              />
            ))}

            <EventHeading2>
              <HeadingItem>
                <HeadingItemTitle>{t('категорія')}</HeadingItemTitle>
                {categories
                  .filter(
                    ct =>
                      events &&
                      events.some(
                        event =>
                          event.category === ct.categoryId ||
                          event.category_second === ct.categoryId ||
                          event.category_third === ct.categoryId
                      )
                  )
                  .map((ct, idx) => (
                    <HeadingItemData key={idx + ct.title}>
                      {ct.title}
                    </HeadingItemData>
                  ))}
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>{t('Мова')}</HeadingItemTitle>
                <HeadingItemDataBox>
                  {language && (
                    <HeadingItemData style={{ marginRight: 5 }}>
                      {language}
                    </HeadingItemData>
                  )}
                  {language_secondary && (
                    <HeadingItemData style={{ marginRight: 5 }}>
                      {language_secondary}
                    </HeadingItemData>
                  )}
                  {language_third && (
                    <HeadingItemData>{language_third}</HeadingItemData>
                  )}
                </HeadingItemDataBox>
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>
                  {t('кількість вільних місць')}
                </HeadingItemTitle>
                <HeadingItemData>
                  {vacancies}/{seats}
                </HeadingItemData>
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>{t('ціна')}</HeadingItemTitle>
                <HeadingItemData>{price}</HeadingItemData>
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
              {events &&
                events.map((ev, idx) => (
                  <EventDescr key={idx}>{ev.description}</EventDescr>
                ))}
            </EventDescrBox>

            <EventDescrBox>
              <EventDescrBoxTitle>{t('Спеціаліст')}</EventDescrBoxTitle>
              {specialist
                .filter(
                  sp =>
                    events &&
                    events.some(event => event.specialistId === sp.specialistId)
                )
                .map((sp, idx) => (
                  <NavLinkSpecialist
                    to={`/specialists/${sp.specialistId}`}
                    key={idx + sp.specialistId}
                  >
                    <span>{sp.name}</span>
                  </NavLinkSpecialist>
                ))}
            </EventDescrBox>
          </EventTextWrapper>

          <BtnAccent
            style={{ display: 'flex', justifyContent: 'center' }}
            type="button"
            aria-label="Register"
            onClick={e => {
              openModal(e);
            }}
            data-modal="event"
            disabled={activeEvents.vacancies <= 0}
          >
            {t('Реєстрація')}
          </BtnAccent>
        </Container>
      </EventsSection>
      <RegisterModal activeEvents={activeEvents} />
    </>
  );
};

EventDetails.propTypes = {
  activeEvents: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      article_eventID: PropTypes.string,
      eventId: PropTypes.string,
      date: PropTypes.string,
      time: PropTypes.string,
      price: PropTypes.number,
      seats: PropTypes.string,
      booking: PropTypes.string,
      vacancies: PropTypes.string,
      language: PropTypes.string,
      language_secondary: PropTypes.string,
      language_third: PropTypes.string,
      location: PropTypes.string,
      address: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};

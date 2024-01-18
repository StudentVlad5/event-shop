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

export const EventDetails = ({ event, articleEventID }) => {
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
  console.log(articleEventID);
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(StatusContext);
  const [activeEvents, setActiveEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [specialist, setSpecialist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [arrE, setArrE] = useState([]);

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
                status: it.status,
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

  // useEffect(() => {
  //   let array = [];
  //   activeEvents.map(it => {
  //     // event.map(item => {
  //     if (it.eventId === article_event && it.status === 'active') {
  //       let data = {};
  //       (data._id = it._id),
  //         (data.article_event = article_event),
  //         (data.language = it.language),
  //         (data.language_secondary = it.language_secondary),
  //         (data.language_third = it.language_third),
  //         (data.price = it.price),
  //         (data.date = it.date),
  //         (data.time = it.time),
  //         (data.location = it.location),
  //         (data.address = it.address),
  //         (data.seats = it.seats),
  //         (data.booking = it.booking),
  //         (data.vacancies = it.vacancies),
  //         (data.status = it.status),
  //         (data.image = image),
  //         (data.image_1 = image_1),
  //         (data.image_2 = image_2),
  //         (data.rating = rating),
  //         (data.duration = duration),
  //         (data.category = category),
  //         (data.category_second = category_second),
  //         (data.category_third = category_third),
  //         (data.specialistId = specialistId),
  //         (data.description = description),
  //         (data.name = name),
  //         array.push(data);
  //     }
  //     // });
  //   });
  //   setArrE(array);
  // }, [activeEvents]);

  useEffect(() => {
    let array = [];
    activeEvents.forEach(it => {
      if (it.eventId === article_event && it.status === 'active') {
        array.push({
          _id: it._id,
          article_event,
          article_eventID: it.article_eventID,
          eventId: it.eventId,
          language: it.language,
          language_secondary: it.language_secondary,
          language_third: it.language_third,
          price: it.price,
          date: it.date,
          time: it.time,
          location: it.location,
          address: it.address,
          seats: it.seats,
          booking: it.booking,
          vacancies: it.vacancies,
          status: it.status,
          image: it.image,
          image_1: it.image_1,
          image_2: it.image_2,
          rating: it.rating,
          duration: it.duration,
          category: it.category,
          category_second: it.category_second,
          category_third: it.category_third,
          specialistId: it.specialistId,
          description: it.description,
          name: it.name,
        });
      }
    });
    console.log('arrE:', array);

    setArrE(array);
  }, [activeEvents]);
  // const selectedEvent = activeEvents.find(ev => ev.eventId === article_event);
  // const selectedEvent = activeEvents.find(ev => ev.eventId === article_event);

  const [selectedEvent, setSelectedEvent] = useState([]);

  useEffect(() => {
    // const selectedEvent = activeEvents.find(ev => ev.eventId === article_event);

    // const filteredEvent = arrE.filter(ev => {
    //   articleEventID.filter(
    //     eve =>ev.article_eventID ===eve.article_eventID
    //   );
    // });
    console.log(activeEvents);
    const filteredEvent = activeEvents.filter(ev =>
      articleEventID.some(eve => ev.article_eventID === eve.article_eventID)
    );
    console.log('filteredEvent:', filteredEvent);
    setSelectedEvent(filteredEvent);
  }, [activeEvents, arrE]);

  return (
    <>
      <EventsSection>
        <Container>
          <EventTitle>{name}</EventTitle>
          <BtnBack type="button" onClick={goBack}>
            <HiArrowLeft size={16} />
            {t('Назад')}
          </BtnBack>
          <InfoBox>
            <EventHeading>
              <HeadingItem>
                <HeadingItemTitle>{t('дата')}</HeadingItemTitle>
                {selectedEvent.map((ev, idx) => (
                  <HeadingItemData key={idx + ev.date}>
                    {new Date(ev.date).toLocaleDateString()}
                  </HeadingItemData>
                ))}
                {/* {selectedEvent && (
                  <HeadingItemData key={selectedEvent.date}>
                    {new Date(selectedEvent.date).toLocaleDateString()}
                  </HeadingItemData>
                )} */}
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>{t('час')}</HeadingItemTitle>
                {arrE.map((ev, idx) => (
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
                  <HeadingItemData key={idx + ev.location + ev.address}>
                    {ev.location} <br /> <br /> {ev.address}
                  </HeadingItemData>
                ))}
              </HeadingItem>
            </EventHeading>

            {images.map((image, idx) => (
              <EventImage
                key={idx + event.name}
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
                    <HeadingItemData key={idx + ct.title}>
                      {ct.title}
                    </HeadingItemData>
                  </>
                ))}
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>{t('Мова')}</HeadingItemTitle>
                {activeEvents.map((ev, idx) => (
                  <HeadingItemDataBox key={idx + ev?.language}>
                    <HeadingItemData style={{ marginRight: 5 }}>
                      {ev?.language}
                    </HeadingItemData>
                    <HeadingItemData>{ev?.language_secondary}</HeadingItemData>
                    <HeadingItemData>{ev?.language_third}</HeadingItemData>
                  </HeadingItemDataBox>
                ))}
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>
                  {t('кількість вільних місць')}
                </HeadingItemTitle>
                {activeEvents.map((ev, idx) => (
                  <HeadingItemData key={idx + ev?.vacancies + ev?.seats}>
                    {ev?.vacancies}/{ev?.seats}
                  </HeadingItemData>
                ))}
              </HeadingItem>
              <HeadingItem>
                <HeadingItemTitle>{t('ціна')}</HeadingItemTitle>
                {activeEvents.map((ev, idx) => (
                  <HeadingItemData key={idx + ev?.price}>
                    {ev?.price}
                  </HeadingItemData>
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
              <EventDescrBoxTitle>{t('Спеціаліст')}</EventDescrBoxTitle>
              {specialist.map((sp, idx) => (
                <NavLinkSpecialist
                  to={`/specialists/${sp.specialistId}`}
                  key={idx + sp.specialistId}
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
            disabled={activeEvents.map(ev => ev?.vacancies <= 0)}
          >
            {t('Реєстрація')}
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
  articleEventID: PropTypes.arrayOf(PropTypes.shape({})),
};

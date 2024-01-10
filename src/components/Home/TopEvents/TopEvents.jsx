import { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { fetchData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { StatusContext } from 'components/ContextStatus/ContextStatus';
import { BASE_URL_IMG } from 'helpers/constants';
import defaultImg from 'images/No-image-available.webp';
import { Container, Title } from 'components/baseStyles/CommonStyle.styled';
import { BtnLink } from 'components/baseStyles/Button.styled';
import {
  BtnPagination,
  Pagination,
} from '../TopSpecialists/TopSpecialists.styled';
import {
  EventsSection,
  BtnLinkText,
  EventListItem,
  ItemImg,
  DetailsWrapper,
  Name,
  Describe,
  DateTimeWrapper,
  Head,
  Date,
} from './TopEvents.styled';

export const TopEvents = () => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/active_events`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        let langData = [];
        data.map(activeEvent => {
          let item = [
            {
              _id: activeEvent._id,
              article_eventID: activeEvent.article_eventID,
              seats: activeEvent.seats,
              vacancies: activeEvent.vacancies,
              booking: activeEvent.booking,
              date: activeEvent.date,
              time: activeEvent.time,
              language: activeEvent.language,
              language_secondary: activeEvent.language_secondary,
              price: activeEvent.price,
              eventId: activeEvent.eventId,
              ...activeEvent[selectedLanguage],
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
        const { data } = await fetchData(`/events`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        let langData = [];
        data.map(event => {
          let item = [
            {
              _id: event._id,
              article_event: event.article_event,
              language: event.language,
              image: event.image,
              image_1: event.image_1,
              image_2: event.image_2,
              rating: event.rating,
              duration: event.duration,
              category: event.category,
              specialistId: event.specialistId,
              ...event[selectedLanguage],
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

  const widthWindow = window.innerWidth;

  return (
    <EventsSection>
      <Container>
        <Title>{t('Найближчі заходи')}</Title>
        <BtnLinkText to={`/events`}>
          <span>{t('Інші події')}</span>
        </BtnLinkText>
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError(t('Whoops, something went wrong'))}
        {events.length > 0 && !error && (
          <>
            {widthWindow >= 1440 ? (
              <Swiper
                modules={[Navigation, Mousewheel, Keyboard]}
                spaceBetween={50}
                slidesPerView={3}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                pagination={{ clickable: true }}
                mousewheel={true}
                keyboard={true}
                loop={true}
                loopPreventsSliding={true}
                loopedslides={1}
              >
                {events.slice(0, 5).map(event => {
                  return (
                    <SwiperSlide key={event.article_event}>
                      <EventListItem>
                        <ItemImg
                          src={
                            event.image
                              ? BASE_URL_IMG +
                                event.image.split('/')[
                                  event.image.split('/').length - 1
                                ]
                              : defaultImg
                          }
                          alt={event.name}
                          width="402"
                          height="366"
                          loading="lazy"
                        ></ItemImg>
                        <DetailsWrapper>
                          <Name>{event.name}</Name>
                          <DateTimeWrapper>
                            <li>
                              <Head>{t('дата')}</Head>
                              <Date>{event.duration}</Date>
                            </li>
                            <li>
                              <Head>{t('час')}</Head>
                              <Date>{event.duration}</Date>
                            </li>
                          </DateTimeWrapper>
                          <Describe>
                            {event.description.length > 100
                              ? event.description.slice(0, 100) + ' ...'
                              : event.description}
                          </Describe>
                          <BtnLink to={`/events/${event.article_event}`}>
                            <span>{t('Детальніше')}</span>
                          </BtnLink>
                        </DetailsWrapper>
                      </EventListItem>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <Swiper
                modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                pagination={{ clickable: true }}
                mousewheel={true}
                keyboard={true}
                loop={true}
                loopPreventsSliding={true}
                loopedslides={1}
                autoplay={{ delay: 5000 }}
                effect={'creative'}
              >
                {events.slice(0, 5).map(event => {
                  return (
                    <SwiperSlide key={event.article_event}>
                      <EventListItem>
                        <ItemImg
                          src={
                            event.image
                              ? BASE_URL_IMG +
                                event.image.split('/')[
                                  event.image.split('/').length - 1
                                ]
                              : defaultImg
                          }
                          alt={event.name}
                          width="335"
                          height="300"
                          loading="lazy"
                        ></ItemImg>
                        <DetailsWrapper>
                          <Name>{event.name}</Name>
                          <DateTimeWrapper>
                            <li>
                              <Head>{t('дата')}</Head>
                              <Date>{event.duration}</Date>
                            </li>
                            <li>
                              <Head>{t('час')}</Head>
                              <Date>{event.duration}</Date>
                            </li>
                          </DateTimeWrapper>
                          <Describe>
                            {event.description.length > 100
                              ? event.description.slice(0, 100) + ' ...'
                              : event.description}
                          </Describe>
                          <BtnLink to={`/events/${event.article_event}`}>
                            <span>{t('Детальніше')}</span>
                          </BtnLink>
                        </DetailsWrapper>
                      </EventListItem>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
            <Pagination>
              <BtnPagination className="swiper-button-prev">
                <MdKeyboardArrowLeft size={30} className="buttonSlide" />
              </BtnPagination>
              <BtnPagination className="swiper-button-next">
                <MdKeyboardArrowRight size={30} className="buttonSlide" />
              </BtnPagination>
            </Pagination>
          </>
        )}
      </Container>
    </EventsSection>
  );
};

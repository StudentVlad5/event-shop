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
  DateTime,
  ViewportBox,
} from './TopEvents.styled';

export const TopEvents = () => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [active_events, setActive_Events] = useState([]);
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
              address: activeEvent.address,
              location: activeEvent.location,
              status: activeEvent.status,
            },
          ];
          langData.push(item[0]);
        });
        setActive_Events(langData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [t]);

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
  }, [selectedLanguage, t]);

  useEffect(() => {
    let array = [];
    active_events.map(it => {
      events.map(item => {
        if (it.eventId === item.article_event) {
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
            (data.status = it.status),
            (data.seats = it.seats),
            (data.booking = it.booking),
            (data.vacancies = it.vacancies),
            (data.image = item.image),
            (data.image_1 = item.image_1),
            (data.image_2 = item.image_2),
            (data.rating = item.rating),
            (data.duration = item.duration),
            (data.category = item.category),
            (data.specialistId = item.specialistId),
            (data.description = item.description),
            (data.name = item.name),
            array.push(data);
        }
      });
    });
    setActiveEvents(array);
  }, [active_events, events, t]);

  return (
    <EventsSection>
      <Container>
        <Title>{t('Les prochains evenements')}</Title>
        <BtnLinkText to={`/events`}>
          <span>{t('Autres evenements')}</span>
        </BtnLinkText>
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError(t('Whoops, something went wrong'))}
        {activeEvents.length > 0 && !error && (
          <>
            <ViewportBox>
              <Swiper
                modules={[Navigation, Mousewheel, Keyboard]}
                // breakpoints={{
                //   375: {
                //     spaceBetween: 50,
                //     slidesPerView: 1,
                //     mousewheel: true,
                //     autoplay: {
                //       delay: 5000,
                //     },
                //     effect: 'creative',
                //   },
                //   768: {
                //     spaceBetween: 50,
                //     slidesPerView: 2,
                //     autoplay: {
                //       delay: 5000,
                //     },
                //     effect: 'creative',
                //   },
                //   1440: {
                //     spaceBetween: 50,
                //     slidesPerView: 3,
                //   },
                // }}
                spaceBetween={50}
                slidesPerView={3}
                navigation={{
                  prevEl: '.swiper-btn-prev',
                  nextEl: '.swiper-btn-next',
                }}
                pagination={{ clickable: true }}
                keyboard={true}
                loop={true}
                loopPreventsSliding={true}
                loopedslides={1}
              >
                {activeEvents
                  .filter(event => event.status === 'active')
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <EventListItem>
                          <ItemImg
                            src={
                              event.image
                                ? BASE_URL_IMG +
                                  'events/' +
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
                                <Head>{t('Date')}</Head>
                                <DateTime>
                                  {new Date(event.date).toLocaleDateString()}
                                </DateTime>
                              </li>
                              <li>
                                <Head>{t('Heure')}</Head>
                                <DateTime>{event.time}</DateTime>
                              </li>
                            </DateTimeWrapper>
                            <Describe>
                              {event.description.length > 50
                                ? event.description.slice(0, 50) + ' ...'
                                : event.description}
                            </Describe>
                            <BtnLink to={`/events/${event._id}`}>
                              <span>{t('Suivant')}</span>
                            </BtnLink>
                          </DetailsWrapper>
                        </EventListItem>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </ViewportBox>
            <ViewportBox $mobile>
              <Swiper
                modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                mousewheel={true}
                navigation={{
                  prevEl: '.swiper-btn-prev',
                  nextEl: '.swiper-btn-next',
                }}
                pagination={{ clickable: true }}
                keyboard={true}
                loop={true}
                loopPreventsSliding={true}
                loopedslides={1}
                autoplay={{ delay: 5000 }}
                effect={'creative'}
              >
                {activeEvents
                  .filter(event => event.status === 'active')
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <EventListItem>
                          <ItemImg
                            src={
                              event.image
                                ? BASE_URL_IMG +
                                  'events/' +
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
                                <Head>{t('Date')}</Head>
                                <DateTime>
                                  {new Date(event.date).toLocaleDateString()}
                                </DateTime>
                              </li>
                              <li>
                                <Head>{t('Heure')}</Head>
                                <DateTime>{event.time}</DateTime>
                              </li>
                            </DateTimeWrapper>
                            <Describe>
                              {event.description.length > 50
                                ? event.description.slice(0, 50) + ' ...'
                                : event.description}
                            </Describe>
                            <BtnLink to={`/events/${event._id}`}>
                              <span>{t('Suivant')}</span>
                            </BtnLink>
                          </DetailsWrapper>
                        </EventListItem>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </ViewportBox>
            <Pagination>
              <BtnPagination className="swiper-btn-prev">
                <MdKeyboardArrowLeft size={30} className="buttonSlide" />
              </BtnPagination>
              <BtnPagination className="swiper-btn-next">
                <MdKeyboardArrowRight size={30} className="buttonSlide" />
              </BtnPagination>
            </Pagination>
          </>
        )}
      </Container>
    </EventsSection>
  );
};

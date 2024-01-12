import PropTypes from 'prop-types';
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
import { FormMessage } from 'components/FormMessage/FormMessage';
import { BackButton } from 'helpers/BackLink/BackLink';
import { BASE_URL_IMG } from 'helpers/constants';
import defaultImg from 'images/defaultUserPhoto.jpg';
import {
  Container,
  Headline,
  Subtitle,
  Title,
} from 'components/baseStyles/CommonStyle.styled';
import { BtnLink } from 'components/baseStyles/Button.styled';
import {
  DescriptionSection,
  EventsSection,
  Image,
  MessageSection,
} from './Specialist.styled';
import {
  DateTime,
  DateTimeWrapper,
  Describe,
  DetailsWrapper,
  EventListItem,
  Head,
  ItemImg,
  Name,
  ViewportBox,
} from 'components/Home/TopEvents/TopEvents.styled';
import {
  BtnPagination,
  Pagination,
} from 'components/Home/TopSpecialists/TopSpecialists.styled';

export const Specialist = ({ specialist }) => {
  const { specialistId, image, description, name } = specialist;
  const [events, setEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [specialistEvents, setSpecialistEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  console.log('events:', events);
  console.log('activeEvents:', activeEvents);
  console.log('specialistEvents:', specialistEvents);

  const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();

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
          .filter(item => item.specialistId === specialistId)
          .map(event => {
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
    let specialistActiveEvents = activeEvents.filter(event =>
      events.every(item => item.article_event === event.article_eventID)
    );
    setSpecialistEvents(specialistActiveEvents);
  }, [activeEvents, events]);

  const firstName = name => {
    let firstWord = name.indexOf(' ');
    if (firstWord == -1) {
      return name;
    }
    return name.slice(0, firstWord);
  };

  return (
    <Container>
      <DescriptionSection>
        <BackButton to="/specialists">{t('Назад')}</BackButton>
        <Image
          src={
            image
              ? BASE_URL_IMG +
                'avatars/' +
                image.split('/')[image.split('/').length - 1]
              : defaultImg
          }
          alt={name}
          width="182"
          height="216"
          loading="lazy"
        ></Image>
        <Headline
          data-aos="fade-right"
          // data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          {name}
        </Headline>
        <Subtitle
          style={{ textAlign: 'justify' }}
          data-aos="fade-left"
          // data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          {description}
        </Subtitle>
      </DescriptionSection>
      <EventsSection>
        <Title>
          {t('Найближчі заходи')} {firstName(name)}
        </Title>
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError(t('Whoops, something went wrong'))}
        {events.length > 0 && !error ? (
          <>
            <ViewportBox>
              <Swiper
                modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
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
                //     autoplay: { delay: 5000 },
                //     effect: 'creative',
                //   },
                //   1440: {
                //     spaceBetween: 50,
                //     slidesPerView: 3,
                //   },
                // }}
                spaceBetween={50}
                slidesPerView={3}
                mousewheel={true}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                pagination={{ clickable: true }}
                keyboard={true}
                loop={true}
                loopPreventsSliding={true}
                loopedslides={1}
              >
                {specialistEvents.slice(0, 5).map(event => {
                  return (
                    <SwiperSlide key={event.article_eventID}>
                      <EventListItem>
                        {events
                          .filter(
                            it => it.article_event === event.article_eventID
                          )
                          .map(item => {
                            return (
                              <ItemImg
                                key={item.article_event}
                                src={
                                  item.image
                                    ? BASE_URL_IMG +
                                      'events/' +
                                      item.image.split('/')[
                                        item.image.split('/').length - 1
                                      ]
                                    : defaultImg
                                }
                                alt={item.name}
                                width="402"
                                height="366"
                                loading="lazy"
                              ></ItemImg>
                            );
                          })}
                        <DetailsWrapper>
                          {events
                            .filter(
                              it => it.article_event === event.article_eventID
                            )
                            .map(item => {
                              return (
                                <Name key={item.article_event}>
                                  {item.name}
                                </Name>
                              );
                            })}
                          <DateTimeWrapper>
                            <li>
                              <Head>{t('дата')}</Head>
                              <DateTime>
                                {new Date(event.date).toLocaleDateString()}
                              </DateTime>
                            </li>
                            <li>
                              <Head>{t('час')}</Head>
                              <DateTime>{event.time}</DateTime>
                            </li>
                          </DateTimeWrapper>
                          {events
                            .filter(
                              it => it.article_event === event.article_eventID
                            )
                            .map(item => {
                              return (
                                <Describe key={item.article_event}>
                                  {item.description.length > 100
                                    ? item.description.slice(0, 100) + ' ...'
                                    : item.description}
                                </Describe>
                              );
                            })}
                          <BtnLink to={`/events/${event.article_event}`}>
                            <span>{t('Детальніше')}</span>
                          </BtnLink>
                        </DetailsWrapper>
                      </EventListItem>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              {specialistEvents.length > 3 && (
                <Pagination>
                  <BtnPagination className="swiper-button-prev">
                    <MdKeyboardArrowLeft size={30} className="buttonSlide" />
                  </BtnPagination>
                  <BtnPagination className="swiper-button-next">
                    <MdKeyboardArrowRight size={30} className="buttonSlide" />
                  </BtnPagination>
                </Pagination>
              )}
            </ViewportBox>
            <ViewportBox $mobile>
              <Swiper
                modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
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
                //     autoplay: { delay: 5000 },
                //     effect: 'creative',
                //   },
                //   1440: {
                //     spaceBetween: 50,
                //     slidesPerView: 3,
                //   },
                // }}
                spaceBetween={50}
                slidesPerView={1}
                mousewheel={true}
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                pagination={{ clickable: true }}
                keyboard={true}
                loop={true}
                loopPreventsSliding={true}
                loopedslides={1}
                autoplay={{ delay: 5000 }}
                effect={'creative'}
              >
                {specialistEvents.slice(0, 5).map(event => {
                  return (
                    <SwiperSlide key={event.article_eventID}>
                      <EventListItem>
                        {events
                          .filter(
                            it => it.article_event === event.article_eventID
                          )
                          .map(item => {
                            return (
                              <ItemImg
                                key={item.article_event}
                                src={
                                  item.image
                                    ? BASE_URL_IMG +
                                      'events/' +
                                      item.image.split('/')[
                                        item.image.split('/').length - 1
                                      ]
                                    : defaultImg
                                }
                                alt={item.name}
                                width="402"
                                height="366"
                                loading="lazy"
                              ></ItemImg>
                            );
                          })}
                        <DetailsWrapper>
                          {events
                            .filter(
                              it => it.article_event === event.article_eventID
                            )
                            .map(item => {
                              return (
                                <Name key={item.article_event}>
                                  {item.name}
                                </Name>
                              );
                            })}
                          <DateTimeWrapper>
                            <li>
                              <Head>{t('дата')}</Head>
                              <DateTime>
                                {new Date(event.date).toLocaleDateString()}
                              </DateTime>
                            </li>
                            <li>
                              <Head>{t('час')}</Head>
                              <DateTime>{event.time}</DateTime>
                            </li>
                          </DateTimeWrapper>
                          {events
                            .filter(
                              it => it.article_event === event.article_eventID
                            )
                            .map(item => {
                              return (
                                <Describe key={item.article_event}>
                                  {item.description.length > 100
                                    ? item.description.slice(0, 100) + ' ...'
                                    : item.description}
                                </Describe>
                              );
                            })}
                          <BtnLink to={`/events/${event.article_event}`}>
                            <span>{t('Детальніше')}</span>
                          </BtnLink>
                        </DetailsWrapper>
                      </EventListItem>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              {specialistEvents.length > 0 && (
                <Pagination>
                  <BtnPagination className="swiper-button-prev">
                    <MdKeyboardArrowLeft size={30} className="buttonSlide" />
                  </BtnPagination>
                  <BtnPagination className="swiper-button-next">
                    <MdKeyboardArrowRight size={30} className="buttonSlide" />
                  </BtnPagination>
                </Pagination>
              )}
            </ViewportBox>
          </>
        ) : (
          <Subtitle>{t('Поки відсутні')}</Subtitle>
        )}
      </EventsSection>
      <MessageSection>
        <Title>
          {t('Є питання до')} {firstName(name)}?
        </Title>
        <FormMessage specialist={specialist} />
      </MessageSection>
    </Container>
  );
};

Specialist.propTypes = {
  specialist: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    specialistId: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

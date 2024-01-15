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
  SViewportBox,
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
        setActiveEvents(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedLanguage]);

  // useEffect(() => {
  //   let specialistActiveEvents = activeEvents.filter(event =>
  //     events.every(item => item.article_event === event.eventId)
  //   );
  //   setSpecialistEvents(specialistActiveEvents);
  // }, [activeEvents, events]);

  useEffect(() => {
    let array = [];
    activeEvents.map(it => {
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
    setSpecialistEvents(array);
  }, [activeEvents, events]);

  const firstName = name => {
    let firstWord = name.indexOf(' ');
    if (firstWord == -1) {
      return name;
    }
    return name.slice(0, firstWord);
  };

  const [isHovered, setHovered] = useState(null);

  const handleMouseEnter = eventId => {
    setHovered(eventId);
  };

  const handleMouseLeave = () => {
    setHovered(null);
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
        {specialistEvents.length > 0 && !error ? (
          <>
            <SViewportBox>
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
                {specialistEvents.slice(0, 5).map((event, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <EventListItem
                        onMouseEnter={() =>
                          handleMouseEnter(event.article_event)
                        }
                        onMouseLeave={handleMouseLeave}
                      >
                        <ItemImg
                          key={event.article_event}
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
                        />
                        {isHovered === event.article_event && (
                          <DetailsWrapper>
                            <Name>{event.name}</Name>
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
                            <Describe>
                              {event.description.length > 50
                                ? event.description.slice(0, 50) + ' ...'
                                : event.description}
                            </Describe>
                            <BtnLink to={`/events/${event.article_event}`}>
                              <span>{t('Детальніше')}</span>
                            </BtnLink>
                          </DetailsWrapper>
                        )}
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
            </SViewportBox>
            <ViewportBox $mobile>
              <Swiper
                modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
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
                {specialistEvents.slice(0, 5).map((event, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <EventListItem
                        onMouseEnter={() =>
                          handleMouseEnter(event.article_event)
                        }
                        onMouseLeave={handleMouseLeave}
                      >
                        <ItemImg
                          key={event.article_event}
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
                        />
                        {isHovered === event.article_event && (
                          <DetailsWrapper>
                            <Name>{event.name}</Name>
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
                            <Describe>
                              {event.description.length > 50
                                ? event.description.slice(0, 50) + ' ...'
                                : event.description}
                            </Describe>
                            <BtnLink to={`/events/${event.article_event}`}>
                              <span>{t('Детальніше')}</span>
                            </BtnLink>
                          </DetailsWrapper>
                        )}
                      </EventListItem>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              {specialistEvents.length > 1 && (
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
          <Subtitle>
            {t(
              'Вибачте, найближчим часом спеціаліст не проводить майстер-класи'
            )}
          </Subtitle>
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

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
import { BASE_URL_AVATAR, BASE_URL_IMG } from 'helpers/constants';
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
  EventList,
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

  const handleMouseEnter = i => {
    setHovered(i);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <Container>
      <DescriptionSection>
        <BackButton to="/specialists">{t('Retour')}</BackButton>
        <Image
          src={
            image
              ? BASE_URL_AVATAR +
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
          {t('Les prochains evenements à un expert')} 
          {/* {firstName(name)} */}
        </Title>
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError(t('Whoops, something went wrong'))}
        {specialistEvents.filter(event => event.status === 'active').length ===
          0 &&
          !error && (
            <Subtitle>
              {t(
                "Nous sommes désolés, l'expert ne fait pas les ateliers ces prochains jours"
              )}
            </Subtitle>
          )}
        {specialistEvents.filter(event => event.status === 'active').length >
          0 &&
          specialistEvents.filter(event => event.status === 'active').length <=
            3 &&
          !error && (
            <>
              <EventList>
                {specialistEvents
                  .filter(event => event.status === 'active')
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event, i) => {
                    return (
                      <EventListItem
                        key={i}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                        onTouchStart={() => handleMouseEnter(i)}
                        // onTouchEnd={handleMouseLeave}
                      >
                        <ItemImg
                          key={event._id}
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
                        />
                        {isHovered === i && (
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
                        )}
                      </EventListItem>
                    );
                  })}
              </EventList>
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
                  {specialistEvents
                    .filter(event => event.status === 'active')
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <EventListItem
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={handleMouseLeave}
                            onTouchStart={() => handleMouseEnter(i)}
                            // onTouchEnd={handleMouseLeave}
                          >
                            <ItemImg
                              key={event._id}
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
                            />
                            {isHovered === i && (
                              <DetailsWrapper>
                                <Name>{event.name}</Name>
                                <DateTimeWrapper>
                                  <li>
                                    <Head>{t('Date')}</Head>
                                    <DateTime>
                                      {new Date(
                                        event.date
                                      ).toLocaleDateString()}
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
          )}
        {specialistEvents.filter(event => event.status === 'active').length >
          3 &&
          !error && (
            <>
              <SViewportBox>
                <Swiper
                  modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
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
                  {specialistEvents
                    .filter(event => event.status === 'active')
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <EventListItem
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={handleMouseLeave}
                            onTouchStart={() => handleMouseEnter(i)}
                            // onTouchEnd={handleMouseLeave}
                          >
                            <ItemImg
                              key={event._id}
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
                            />
                            {isHovered === i && (
                              <DetailsWrapper>
                                <Name>{event.name}</Name>
                                <DateTimeWrapper>
                                  <li>
                                    <Head>{t('Date')}</Head>
                                    <DateTime>
                                      {new Date(
                                        event.date
                                      ).toLocaleDateString()}
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
                  {specialistEvents
                    .filter(event => event.status === 'active')
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <EventListItem
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={handleMouseLeave}
                            onTouchStart={() => handleMouseEnter(i)}
                            // onTouchEnd={handleMouseLeave}
                          >
                            <ItemImg
                              key={event._id}
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
                            />
                            {isHovered === i && (
                              <DetailsWrapper>
                                <Name>{event.name}</Name>
                                <DateTimeWrapper>
                                  <li>
                                    <Head>{t('Date')}</Head>
                                    <DateTime>
                                      {new Date(
                                        event.date
                                      ).toLocaleDateString()}
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
          )}
      </EventsSection>
      <MessageSection>
        <Title>{t('Vous avez des question à un expert?')}?</Title>
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

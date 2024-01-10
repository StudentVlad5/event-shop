import PropTypes from 'prop-types';
import { Formik } from 'formik';
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
import { BackButton } from 'helpers/BackLink/BackLink';
import { BASE_URL_IMG } from 'helpers/constants';
import defaultImg from 'images/defaultUserPhoto.jpg';
import {
  Container,
  Headline,
  Subtitle,
  Title,
} from 'components/baseStyles/CommonStyle.styled';
import { BtnAccent, BtnLink } from 'components/baseStyles/Button.styled';
import {
  DescriptionSection,
  EventsSection,
  MessageSection,
  FormInputMessage,
  Image,
  FormList,
  FormLabel,
  FormName,
  FormInput,
  Error,
  FieldsWrapper,
} from './Specialist.styled';
import {
  Date,
  DateTimeWrapper,
  Describe,
  DetailsWrapper,
  EventListItem,
  Head,
  ItemImg,
  Name,
} from 'components/Home/TopEvents/TopEvents.styled';

import {
  BtnPagination,
  Pagination,
} from 'components/Home/TopSpecialists/TopSpecialists.styled';

export const Specialist = ({ specialist }) => {
  const {
    _id,
    specialistId,
    rating,
    email,
    phone,
    status,
    image,
    description,
    name,
  } = specialist;
  const [events, setEvents] = useState([]);
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

  const widthWindow = window.innerWidth;

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
              ? BASE_URL_IMG + image.split('/')[image.split('/').length - 1]
              : defaultImg
          }
          alt={name}
          width="182"
          height="216"
          loading="lazy"
        ></Image>
        <Headline>{name}</Headline>
        <Subtitle>{description}</Subtitle>
      </DescriptionSection>
      <EventsSection>
        <Title>
          {t('Найближчі заходи')} {firstName(name)}
        </Title>
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError(t('Whoops, something went wrong'))}
        {events.length > 0 && !error && (
          <>
            {widthWindow >= 1440 ? (
              <>
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
                {events.length > 3 && (
                  <Pagination>
                    <BtnPagination className="swiper-button-prev">
                      <MdKeyboardArrowLeft size={30} className="buttonSlide" />
                    </BtnPagination>
                    <BtnPagination className="swiper-button-next">
                      <MdKeyboardArrowRight size={30} className="buttonSlide" />
                    </BtnPagination>
                  </Pagination>
                )}
              </>
            ) : (
              <>
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
          </>
        )}
      </EventsSection>
      <MessageSection>
        <Title>
          {t('Є питання до')} {firstName(name)}?
        </Title>
        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            onSuccess('Your message sent');
            resetForm();
          }}
          enableReinitialize={true}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
            isSubmitting,
            values,
            errors,
            touched,
          }) => (
            <FormList
              autoComplete="off"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <FieldsWrapper>
                <div>
                  <FormLabel htmlFor="name">
                    <FormName>{t('Ім’я')}</FormName>
                    <FormInput
                      type="text"
                      name="name"
                      id="name"
                      placeholder={name}
                      value={values.name}
                      required
                    />
                    {errors.name && touched.name ? (
                      <Error>{errors.name}</Error>
                    ) : null}
                  </FormLabel>
                  <FormLabel htmlFor="email">
                    <FormName>{t('E-mail')}</FormName>
                    <FormInput
                      type="email"
                      name="email"
                      id="email"
                      placeholder="test@gmail.com"
                      value={values.email}
                      required
                    />
                    {errors.email && touched.email ? (
                      <Error>{errors.email}</Error>
                    ) : null}
                  </FormLabel>
                </div>
                <FormLabel htmlFor="message">
                  <FormName>{t('Повідомлення')}</FormName>
                  <FormInputMessage
                    type="text"
                    name="message"
                    id="message"
                    placeholder={t('Привіт! Я хотів би запитати про...')}
                    value={values.message}
                    required
                    rows="6"
                    cols="25"
                    onChange={e => {
                      setFieldValue('message', e.target.value);
                    }}
                  />
                  {errors.state && touched.state ? (
                    <Error>{errors.state}</Error>
                  ) : null}
                </FormLabel>
              </FieldsWrapper>
              <BtnAccent
                type="submit"
                disabled={isSubmitting}
                aria-label="Submit"
              >
                {t('Надіслати')}
              </BtnAccent>
            </FormList>
          )}
        </Formik>
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

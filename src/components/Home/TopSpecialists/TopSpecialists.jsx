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
import { BASE_URL_AVATAR } from 'helpers/constants';
import defaultImg from 'images/defaultUserPhoto.jpg';
import {
  Container,
  Section,
  Title,
} from 'components/baseStyles/CommonStyle.styled';
import { BtnLink } from 'components/baseStyles/Button.styled';
import {
  Describe,
  DetailsWrapper,
  ImgBox,
  ItemImg,
  Name,
  } from 'components/Team/Team.styled';
import { Pagination, BtnPagination, TeamListItem } from './TopSpecialists.styled';
import { ViewportBox } from '../TopEvents/TopEvents.styled';

export const TopSpecialists = () => {
  const [specialists, setSpecialists] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/specialists?sort=rating`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        let langData = [];
        data.map(it => {
          let item = [
            {
              _id: it._id,
              specialistId: it.specialistId,
              status: it.status,
              phone: it.phone,
              email: it.email,
              ...it[selectedLanguage],
              rating: it.rating,
              image: it.image,
            },
          ];
          langData.push(item[0]);
        });
        setSpecialists(langData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedLanguage, t]);

  return (
    <Section>
      <Container>
        <Title>{t('Les spécialistes populaires')}</Title>
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError(t('Whoops, something went wrong'))}
        {specialists.length > 0 && !error && (
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
                //     slidesPerView: 4,
                //   },
                // }}
                spaceBetween={50}
                slidesPerView={4}
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
                {specialists.slice(0, 5).map(specialist => {
                  return (
                    <SwiperSlide key={specialist.specialistId}>
                      <TeamListItem>
                        <ImgBox>
                          <ItemImg
                            src={
                              specialist.image
                                ? BASE_URL_AVATAR +
                                  specialist.image.split('/')[
                                    specialist.image.split('/').length - 1
                                  ]
                                : defaultImg
                            }
                            alt={specialist.name}
                            width="221"
                            height="221"
                            loading="lazy"
                          ></ItemImg>
                        </ImgBox>
                        <DetailsWrapper style={{ paddingBottom: '3px' }}>
                          <Name>{specialist.name}</Name>
                          <Describe>
                            {specialist.description.length > 100
                              ? specialist.description.slice(0, 100) + ' ...'
                              : specialist.description}
                          </Describe>
                          <BtnLink
                            to={`/specialists/${specialist.specialistId}`}
                          >
                            <span>{t('Suivant')}</span>
                          </BtnLink>
                        </DetailsWrapper>
                      </TeamListItem>
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
                {specialists.slice(0, 5).map(specialist => {
                  return (
                    <SwiperSlide key={specialist.specialistId}>
                      <TeamListItem>
                        <ImgBox>
                          <ItemImg
                            src={
                              specialist.image
                                ? BASE_URL_AVATAR +
                                  specialist.image.split('/')[
                                    specialist.image.split('/').length - 1
                                  ]
                                : defaultImg
                            }
                            alt={specialist.name}
                            width="221"
                            height="221"
                            loading="lazy"
                          ></ItemImg>
                        </ImgBox>
                        <DetailsWrapper style={{ paddingBottom: '3px' }}>
                          <Name>{specialist.name}</Name>
                          <Describe>
                            {specialist.description.length > 100
                              ? specialist.description.slice(0, 100) + ' ...'
                              : specialist.description}
                          </Describe>
                          <BtnLink
                            to={`/specialists/${specialist.specialistId}`}
                          >
                            <span>{t('Suivant')}</span>
                          </BtnLink>
                        </DetailsWrapper>
                      </TeamListItem>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </ViewportBox>
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
    </Section>
  );
};

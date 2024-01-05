import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { fetchData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { StatusContext } from 'components/ContextStatus/ContextStatus';

import {
  Container,
  Section,
  Title,
} from 'components/baseStyles/CommonStyle.styled';

export const TopSpecialists = () => {
  // const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();

  return (
    <Section>
      <Container>
        <Title>{t('Популярні спеціалісти')}</Title>
        <Swiper
          modules={[Navigation, Mousewheel, Keyboard]}
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
          loopedSlides={1}
        >
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </Container>
    </Section>
  );
};

import { useTranslation } from 'react-i18next';
import { FormMessage } from 'components/FormMessage/FormMessage';
import { Title, Container } from 'components/baseStyles/CommonStyle.styled';
import {
  AboutSection,
  Wrapper,
  Description,
  ImgBox,
  MessageSection,
} from './AboutUs.styled';

import about_mob_png from 'images/about/about_mob.png';
import about_mob_png_2x from 'images/about/about_mob@2x.png';
import about_mob_webp from 'images/about/about_mob.webp';
import about_mob_webp_2x from 'images/about/about_mob@2x.webp';

import about_desk_png from 'images/about/about_desk.png';
import about_desk_png_2x from 'images/about/about_desk@2x.png';
import about_desk_webp from 'images/about/about_desk.webp';
import about_desk_webp_2x from 'images/about/about_desk@2x.webp';

export const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <AboutSection>
        <Title>{t('Про нас')}</Title>
        <Wrapper>
          <li
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            <Description>
              {t(
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odio voluptatibus aspernatur magni optio nobis nisi quibusdam reiciendis explicabo voluptatum molestias eveniet fuga, in unde cupiditate laboriosam quaerat, velit accusamus. Qui alias blanditiis accusamus adipisci? Nobis porro ducimus laboriosam quam alias odit ut a sequi aliquid aut error, aliquam, dicta enim quos tempora illum doloremque eaque minus quas culpa soluta'
              )}
            </Description>
            <ImgBox>
              <picture>
                <source
                  media="(min-width:1440px)"
                  srcSet={`${about_desk_webp} 1x, ${about_desk_webp_2x} 2x`}
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcSet={`${about_mob_webp} 1x, ${about_mob_webp_2x} 2x`}
                  type="image/webp"
                />
                <img
                  src={about_mob_png}
                  srcSet={`${about_desk_png} 545w, ${about_desk_png_2x} 1090w, ${about_mob_png} 314w,${about_mob_png_2x} 628w`}
                  sizes="(min-width:1440px) 545px, (max-width:767px) 314px, 100vw"
                  width={545}
                  height={257}
                  alt="Girls in a car"
                  loading="lazy"
                />
              </picture>
            </ImgBox>
          </li>
          <li
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="2000"
          >
            <Description>
              {t(
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odio voluptatibus aspernatur magni optio nobis nisi quibusdam reiciendis explicabo voluptatum molestias eveniet fuga, in unde cupiditate laboriosam quaerat, velit accusamus. Qui alias blanditiis accusamus adipisci? Nobis porro ducimus laboriosam quam alias odit ut a sequi aliquid aut error, aliquam, dicta enim quos tempora illum doloremque eaque minus quas culpa soluta'
              )}
            </Description>
            <ImgBox>
              <picture>
                <source
                  media="(min-width:1440px)"
                  srcSet={`${about_desk_webp} 1x, ${about_desk_webp_2x} 2x`}
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcSet={`${about_mob_webp} 1x, ${about_mob_webp_2x} 2x`}
                  type="image/webp"
                />
                <img
                  src={about_mob_png}
                  srcSet={`${about_desk_png} 545w, ${about_desk_png_2x} 1090w, ${about_mob_png} 314w,${about_mob_png_2x} 628w`}
                  sizes="(min-width:1440px) 1090px, (max-width:767px) 314px, 100vw"
                  width={1440}
                  height={735}
                  alt="Girls in a car"
                  loading="lazy"
                />
              </picture>
            </ImgBox>
          </li>
        </Wrapper>
      </AboutSection>
      <MessageSection>
        <Title>{t('Є питання')}?</Title>
        <FormMessage />
      </MessageSection>
    </Container>
  );
};

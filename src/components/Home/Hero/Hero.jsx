import { useTranslation } from 'react-i18next';
import { HeroSection, HeroContainer, TextWrapper } from './Hero.styled';

import hero_mob_png from 'images/hero/hero_mob.png';
import hero_mob_png_2x from 'images/hero/hero_mob@2x.png';
import hero_mob_webp from 'images/hero/hero_mob.webp';
import hero_mob_webp_2x from 'images/hero/hero_mob@2x.webp';

import hero_tab_png from 'images/hero/hero_tab.png';
import hero_tab_png_2x from 'images/hero/hero_tab@2x.png';
import hero_tab_webp from 'images/hero/hero_tab.webp';
import hero_tab_webp_2x from 'images/hero/hero_tab@2x.webp';

import hero_desk_png from 'images/hero/hero_desk.png';
import hero_desk_png_2x from 'images/hero/hero_desk@2x.png';
import hero_desk_webp from 'images/hero/hero_desk.webp';
import hero_desk_webp_2x from 'images/hero/hero_desk@2x.webp';
import { Subtitle, Title } from 'components/baseStyles/CommonStyle.styled';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <HeroSection>
      <HeroContainer>
        <picture>
          <source
            media="(min-width:1440px)"
            srcSet={`${hero_desk_webp} 1x, ${hero_desk_webp_2x} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:768px)"
            srcSet={`${hero_tab_webp} 1x, ${hero_tab_webp_2x} 2x`}
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${hero_mob_webp} 1x, ${hero_mob_webp_2x} 2x`}
            type="image/webp"
          />
          <img
            src={hero_mob_png}
            srcSet={`${hero_desk_png} 1440w, ${hero_desk_png_2x} 2880w, ${hero_tab_png} 768w,${hero_tab_png_2x} 1536w, ${hero_mob_png} 375w,${hero_mob_png_2x} 750w`}
            sizes="(min-width:1440px) 1440px, (min-width:768px) 768px, (max-width:767px) 375px, 100vw"
            width={1440}
            height={735}
            alt="Girls"
            loading="lazy"
          />
        </picture>
        <TextWrapper>
          <Title $white>{t('Ласкаво просимо до BloomSkill')}</Title>
          <Subtitle $white>
            {t(
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odiovoluptatibus aspernatur magni optio nobis nisi quibusdam reiciendis explicabo voluptatum molestias eveniet fuga, in unde cupiditate laboriosam quaerat, velit accusamus. Qui alias blanditiis accusamus adipisci? Nobis porro ducimus laboriosam quam alias odit ut a sequi aliquid aut error, aliquam, dicta enim quos tempora illum doloremque eaque minus quas culpa soluta.'
            )}
          </Subtitle>
        </TextWrapper>
      </HeroContainer>
    </HeroSection>
  );
};

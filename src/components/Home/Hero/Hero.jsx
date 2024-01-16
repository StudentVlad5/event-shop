import { useTranslation } from 'react-i18next';
import { HeroSection, HeroContainer, TextWrapper } from './Hero.styled';
import { Subtitle, Title } from 'components/baseStyles/CommonStyle.styled';

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

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <HeroSection>
      <HeroContainer>
        {/* <picture>
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
        </picture> */}
        <TextWrapper>
          <Title
            $white
            // data-aos="fade-right"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            {t('Bienvenue sur BloomSkill')}
          </Title>
          <Subtitle
            $white
            // data-aos="fade-left"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            {t(
              "une oasis créative unique pour les esprits créatifs. Chez BloomSkill, nous croyons profondément en la puissance du développement des compétences créatives et de la croissance personnelle. Notre plateforme est un espace numérique où vous pouvez acquérir de nouvelles compétences et libérer votre potentiel créatif. Vous trouverez ici une variété de cours, des ateliers, des sessions et des consultations de groupe couvrant un large éventail de domaines - de l'art de la photographie à la maîtrise du tricot. Notre objectif est de devenir votre guide dans le monde de la créativité, où chacun peut trouver ce qui l'inspire et le fait progresser. Rejoignez notre communauté unique de participants à des rencontres créatives et d'experts. Ici, vous pourrez échanger des idées, trouver de l'inspiration et établir des liens précieux tout au long de votre apprentissage. Nous sommes prêts à vous soutenir à chaque étape de ce voyage captivant"
            )}
          </Subtitle>
        </TextWrapper>
      </HeroContainer>
    </HeroSection>
  );
};

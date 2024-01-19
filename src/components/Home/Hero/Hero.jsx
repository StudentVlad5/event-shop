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
            {t('- une oasis créative unique pour les esprits créatifs.')}
            <br />
            {t(
              "Vous trouverez ici une variété de cours, des ateliers, des sessions et des consultations de groupe couvrant un large éventail de domaines - de l'art de la photographie à la maîtrise du tricot. Notre objectif est de devenir votre guide dans le monde de la créativité, où chacun peut trouver ce qui l'inspire et le fait progresser."
            )}
          </Subtitle>
        </TextWrapper>
      </HeroContainer>
    </HeroSection>
  );
};

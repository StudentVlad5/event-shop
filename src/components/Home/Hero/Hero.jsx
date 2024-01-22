import { useTranslation } from 'react-i18next';
import { HeroSection, HeroContainer, TextWrapper } from './Hero.styled';
import { Subtitle, Title } from 'components/baseStyles/CommonStyle.styled';

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
            {t('une oasis créative unique pour les esprits créatifs.')}
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

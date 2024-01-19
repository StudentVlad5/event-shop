import { useTranslation } from 'react-i18next';
import { FormMessage } from 'components/FormMessage/FormMessage';
import { Title, Container } from 'components/baseStyles/CommonStyle.styled';
import {
  AboutSection,
  Wrapper,
  Description,
  ImgBox,
  MessageSection,
  ImgBox1,
  ImgBox2,
} from './AboutUs.styled';

// import about_mob_png from 'images/about/about_mob.png';
// import about_mob_png_2x from 'images/about/about_mob@2x.png';
// import about_mob_webp from 'images/about/about_mob.webp';
// import about_mob_webp_2x from 'images/about/about_mob@2x.webp';

// import about_desk_png from 'images/about/about_desk.png';
// import about_desk_png_2x from 'images/about/about_desk@2x.png';
// import about_desk_webp from 'images/about/about_desk.webp';
// import about_desk_webp_2x from 'images/about/about_desk@2x.webp';

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
                "Bienvenue sur BloomSkill - une oasis créative unique pour ceux qui aspirent à l'auto-développement et à l'épanouissement de leur potentiel créatif. Chez BloomSkill, nous croyons profondément en la puissance du développement des compétences créatives et de la croissance personnelle. Notre plateforme est un espace numérique où vous pouvez acquérir de nouvelles compétences et libérer votre potentiel créatif. Explorez une variété de cours, des ateliers, des sessions individuelles et des consultations de groupe couvrant un large éventail de domaines - de l'art de la photographie à la maîtrise du tricot."
              )}
            </Description>
            <ImgBox1>
              {/* <picture>
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
              </picture> */}
            </ImgBox1>
          </li>
          <li
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="2000"
          >
            <Description>
              {t(
                "Notre objectif est de devenir votre guide dans le monde de la créativité, où chacun peut trouver ce qui l'inspire et le fait progresser. Rejoignez notre communauté unique de participants à des rencontres créatives et d'experts. Ici, vous pourrez échanger des idées, trouver de l'inspiration et établir des liens précieux tout au long de votre apprentissage. Nous sommes prêts à vous soutenir à chaque étape de ce voyage captivant. Bienvenue dans notre monde créatif!"
              )}
            </Description>
            <ImgBox2>
              {/* <picture>
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
              </picture> */}
            </ImgBox2>
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

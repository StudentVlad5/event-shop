import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import { Main } from './SharedLayout.styled';
import { ScrollTop } from 'helpers/Scroll/ScrollToTop';
import { SEO } from 'utils/SEO';

export const SharedLayout = () => {
  return (
    <>
        <Suspense fallback={'Loading...'}>
          <SEO title="agency, bloom, skill, hub, creatif, atelier creatif, atelier, paris, apprentissage, cours, classes, platform, atelier,   développement, de compétences, communauté, explorer, de nouveaux horizons,Cours d'Art, Séances d'Artisanat, Ateliers de Bricolage, Exploration, Artistique, Compétences, Créatives, artisanal, Développement Artistique, Atelier d'Expression, Ateliers Innovants, Initiations Artistiques, Sessions de Fabrication, Communauté Artisanale, Inspiration, Talent Development, Métiers d'Art, Ateliers DIY, Atelier de Création, Éducation Artistique, мастер, класс, мастер класс, Париж, забронировать, забронировать мастер класс, творчество, вдохновение, мастер класс по рисованию, творческие курсы,обучение, майстер, клас,  майстер клас, забронювати, забронювати майстер клас, творчість, натхнення, малювання, париж, творі курси, навчання" description="une oasis créative unique pour les esprits créatifs. Vous trouverez ici une variété de cours, des ateliers, des sessions et des consultations de groupe couvrant un large éventail de domaines - de l'art de la photographie à la maîtrise du tricot. Notre objectif est de devenir votre guide dans le monde de la créativité, où chacun peut trouver ce qui l'inspire et le fait progresser. - унікального творчого оазису для тих, хто прагне до самовдосконалення та розкриття свого творчого потенціалу. Тут ви знайдете різноманітні курси, майстер-класи, сесії та групові консультації, що охоплюють широкий спектр областей - від мистецтва фотографії до влади в'язання. Наша мета - стати вашим провідником у світі творчості, де кожен може знайти те, що надихає та розвиває. - уникальный творческий оазис для тех, кто стремится к саморазвитию и раскрытию своего творческого потенциала. Здесь вы найдете разнообразные курсы, мастер-классы, сессии и групповые консультации, охватывающие широкий спектр областей – от искусства фотографии до мастерства вязания. Наша цель - стать вашим гидом в мире творчества, где каждый может найти именно то, что вдохновляет и развивает"/>
          <Header />
          <Main>
            <Outlet />
          </Main>
          <Footer />
          <ScrollTop />
        </Suspense>
    </>
  );
};

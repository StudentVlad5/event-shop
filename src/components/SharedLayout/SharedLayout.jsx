import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import { Main } from './SharedLayout.styled';
import { ScrollTop } from 'helpers/Scroll/ScrollToTop';

export const SharedLayout = () => {
  return (
    <>
      <Suspense fallback={'Loading...'}>
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

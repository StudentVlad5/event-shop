import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';

export const SharedLayout = () => {
  return (
    <>
      <Suspense fallback={'Loading...'}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </>
  );
};

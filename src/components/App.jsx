import { HeaderComp } from './Header/Header';
import { Suspense } from 'react';
import { FooterComp } from './Footer/Footer';

export const App = () => {
  return (
    <>
    <HeaderComp />
    <div style={{display:"flex"}}>
      <Suspense fallback={'Loading...'}>
        <main>
        </main>
      </Suspense>
    </div>
    <FooterComp />
  </>
  );
};

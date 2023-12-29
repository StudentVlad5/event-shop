import { useEffect } from 'react';
import { SEO } from 'utils/SEO';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEO title="Home" description="" />
    </>
  );
};

export default HomePage;

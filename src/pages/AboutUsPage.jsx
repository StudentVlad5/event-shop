import { useEffect } from 'react';
import { SEO } from 'utils/SEO';
import { AboutUs } from 'components/AboutUs/AboutUs';

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <SEO title="AboutUs" description="Information about us" />
      <AboutUs />
    </>
  );
};

export default AboutUsPage;

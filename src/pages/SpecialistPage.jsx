import { useEffect } from 'react';
import { SEO } from 'utils/SEO';
import { Specialist } from 'components/Team/Specialist/Specialist';

const SpecialistPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <SEO title="Specialist" description="Specialist profile" />
      <Specialist />
    </>
  );
};

export default SpecialistPage;

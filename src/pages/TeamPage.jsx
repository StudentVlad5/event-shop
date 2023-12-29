import { useEffect } from 'react';
import { SEO } from 'utils/SEO';
import { Team } from 'components/Team/Team';

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <SEO title="Team" description="The team of specialists" />
      <Team />
    </>
  );
};

export default TeamPage;

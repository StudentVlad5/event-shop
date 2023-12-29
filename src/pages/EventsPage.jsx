import { useEffect } from 'react';
import { SEO } from 'utils/SEO';
import { Events } from 'components/Events/Events';

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEO title="Events calendar" description="Events calendar" />
      <Events />
    </>
  );
};

export default EventsPage;

import { useEffect } from 'react';
import { SEO } from 'utils/SEO';
import { User } from 'components/User/User';

const UserPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <SEO title="Profile" description="User profile" />
      <User />
    </>
  );
};

export default UserPage;

import { useEffect } from 'react';
import { SEO } from 'utils/SEO';

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEO title="Register" description="" />
    </>
  );
};

export default RegisterPage;

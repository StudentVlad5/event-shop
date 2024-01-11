import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from 'utils/SEO';
import { fetchData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { Specialist } from 'components/Specialist/Specialist';
import { StatusContext } from 'components/ContextStatus/ContextStatus';

const SpecialistPage = () => {
  const [specialist, setSpecialist] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const routeParams = useParams();
  const { t } = useTranslation();
  const { selectedLanguage } = useContext(StatusContext);
  // const [lang, setLang] = useState(getFromStorage('chosenLanguage') || 'fr');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/specialists/${routeParams.id}`);
        const langData = [
          {
            _id: data._id,
            specialistId: data.specialistId,
            status: data.status,
            phone: data.phone,
            email: data.email,
            ...data[selectedLanguage],
            // ...data[lang],
            rating: data.rating,
            image: data.image,
          },
        ];
        setSpecialist(langData[0]);
        if (!data) {
          return onFetchError(t('Whoops, something went wrong'));
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (routeParams.id !== '' && routeParams !== undefined) {
      getData();
    }
  }, [routeParams.id, t]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEO title="Specialist" description="Specialist profile" />
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError(t('Whoops, something went wrong'))}
      {Object.keys(specialist).length > 0 && !error && (
        <Specialist specialist={specialist} />
      )}
    </>
  );
};

export default SpecialistPage;

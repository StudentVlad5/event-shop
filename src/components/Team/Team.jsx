import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { StatusContext } from 'components/ContextStatus/ContextStatus';
import { BASE_URL_IMG } from 'helpers/constants';
import defaultImg from 'images/defaultUserPhoto.jpg';
import {
  Container,
  Section,
  Title,
} from 'components/baseStyles/CommonStyle.styled';
import { BtnLink } from 'components/baseStyles/Button.styled';
import {
  BtnMore,
  Describe,
  DetailsWrapper,
  ImgBox,
  ItemImg,
  Name,
  TeamList,
  TeamListItem,
} from './Team.styled';

export const Team = () => {
  const [specialists, setSpecialists] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();

  const [limit, setLimit] = useState(8);
  const end = count => {
    setLimit(prevState => prevState + count);
  };

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/specialists`);
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        let langData = [];
        data.map(it => {
          let item = [
            {
              _id: it._id,
              specialistId: it.specialistId,
              status: it.status,
              phone: it.phone,
              email: it.email,
              ...it[selectedLanguage],
              rating: it.rating,
              image: it.image,
            },
          ];
          langData.push(item[0]);
        });
        setSpecialists(langData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedLanguage]);

  return (
    <Section>
      <Container>
        <Title>{t('Наші спеціалісти')}</Title>
        {isLoading ? onLoading() : onLoaded()}
        {error && onFetchError(t('Whoops, something went wrong'))}
        {specialists.length > 0 && !error && (
          <TeamList>
            {specialists.slice(0, limit).map(specialist => {
              return (
                <TeamListItem key={specialist.specialistId}>
                  <ImgBox>
                    <ItemImg
                      src={
                        specialist.image
                          ? BASE_URL_IMG +
                            specialist.image.split('/')[
                              specialist.image.split('/').length - 1
                            ]
                          : defaultImg
                      }
                      alt={specialist.name}
                      width="221"
                      height="221"
                      loading="lazy"
                    ></ItemImg>
                  </ImgBox>
                  <DetailsWrapper>
                    <Name>{specialist.name}</Name>
                    <Describe>
                      {specialist.description.length > 100
                        ? specialist.description.slice(0, 100) + ' ...'
                        : specialist.description}
                    </Describe>
                    <BtnLink to={`/specialists/${specialist.specialistId}`}>
                      <span>{t('Детальніше')}</span>
                    </BtnLink>
                  </DetailsWrapper>
                </TeamListItem>
              );
            })}
          </TeamList>
        )}
        {specialists.length > limit && (
          <BtnMore
            type="button"
            aria-label="More specialists"
            onClick={() => end(8)}
          >
            <span>{t('Показати більше')}</span>
          </BtnMore>
        )}
      </Container>
    </Section>
  );
};

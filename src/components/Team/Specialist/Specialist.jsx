import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusContext } from 'components/ContextStatus/ContextStatus';
import { BASE_URL_IMG } from 'helpers/constants';
import defaultImg from 'images/defaultUserPhoto.jpg';
import { Container, Section } from 'components/baseStyles/CommonStyle.styled';

export const Specialist = ({ specialist }) => {
  const {
    _id,
    specialistId,
    rating,
    email,
    phone,
    status,
    image,
    description,
    name,
  } = specialist;

  const { selectedLanguage } = useContext(StatusContext);
  const { t } = useTranslation();

  return (
    <Section>
      <Container></Container>
    </Section>
  );
};

Specialist.propTypes = {
  specialist: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      specialistId: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      image: PropTypes.string,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

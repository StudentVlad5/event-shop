import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createData } from 'services/APIservice';
import { addMessages } from '../../redux/messages/operation';
import { BtnAccent } from 'components/baseStyles/Button.styled';
import {
  Error,
  FieldsWrapper,
  FormInput,
  FormInputMessage,
  FormLabel,
  FormList,
  FormName,
} from './FormMessage.styled';

export const FormMessage = ({ specialist }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  async function createMessage(values) {
    setIsLoading(true);
    try {
      const { data } = await createData(`/messages`, values);
      dispatch(addMessages({ ...data }));
      if (!data) {
        return onFetchError('Whoops, something went wrong');
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
        specialistId: specialist?.specialistId ? specialist.specialistId : '',
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        createMessage(values);
        setSubmitting(false);
        resetForm();
      }}
      enableReinitialize={true}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
        isSubmitting,
        values,
        errors,
        touched,
      }) => (
        <FormList
          autoComplete="off"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <FieldsWrapper>
            <div>
              <FormLabel htmlFor="name">
                <FormName>{t('Ім’я')}</FormName>
                <FormInput
                  type="text"
                  name="name"
                  id="name"
                  placeholder={specialist?.name ? specialist.name : 'Olga'}
                  value={values.name}
                  required
                />
                {errors.name && touched.name ? (
                  <Error>{errors.name}</Error>
                ) : null}
              </FormLabel>
              <FormLabel htmlFor="email">
                <FormName>{t('E-mail')}</FormName>
                <FormInput
                  type="email"
                  name="email"
                  id="email"
                  placeholder="test@gmail.com"
                  value={values.email}
                  required
                />
                {errors.email && touched.email ? (
                  <Error>{errors.email}</Error>
                ) : null}
              </FormLabel>
            </div>
            <FormLabel htmlFor="message">
              <FormName>{t('Повідомлення')}</FormName>
              <FormInputMessage
                type="text"
                name="message"
                id="message"
                placeholder={t('Привіт! Я хотів би запитати про...')}
                value={values.message}
                required
                rows="6"
                cols="25"
                onChange={e => {
                  setFieldValue('message', e.target.value);
                }}
              />
              {errors.state && touched.state ? (
                <Error>{errors.state}</Error>
              ) : null}
            </FormLabel>
          </FieldsWrapper>
          <BtnAccent type="submit" disabled={isSubmitting} aria-label="Submit">
            {t('Надіслати')}
          </BtnAccent>
        </FormList>
      )}
    </Formik>
  );
};

FormMessage.propTypes = {
  specialist: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    specialistId: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

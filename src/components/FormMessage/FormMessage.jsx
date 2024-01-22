import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createData } from 'services/APIservice';
import { addMessages } from '../../redux/messages/operation';
import {
  Error,
  FieldsWrapper,
  FormBtn,
  FormInput,
  FormInputMessage,
  FormLabel,
  FormList,
  FormName,
  LableBoxMes,
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

  const MessageSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    message: Yup.string().required('Required'),
  });

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
      validationSchema={MessageSchema}
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
            <LableBoxMes>
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
            </LableBoxMes>
            <FormLabel htmlFor="message">
              <FormName>{t('Повідомлення')}</FormName>
              <FormInputMessage
                type="text"
                name="message"
                id="message"
                placeholder={t('Привіт! Я хотів би запитати про...')}
                value={values.message}
                required
                // rows="6"
                // cols="25"
                onChange={e => {
                  setFieldValue('message', e.target.value);
                }}
              />
              {errors.state && touched.state ? (
                <Error>{errors.state}</Error>
              ) : null}
            </FormLabel>
          </FieldsWrapper>
          <FormBtn type="submit" disabled={isSubmitting} aria-label="Submit">
            {t('Надіслати')}
          </FormBtn>
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

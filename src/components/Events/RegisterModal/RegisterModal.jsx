import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { Formik } from 'formik';
import { closeModalWindow } from '../../../hooks/ModalWindow';
import { cleanModal } from '../../../redux/modal/operation';
import { modalComponent } from '../../../redux/modal/selectors';
import {
  MessageSection,
  FormInputMessage,
  FormList,
  FormLabel,
  FormName,
  FormInput,
  Error,
  FieldsWrapper,
} from './RegisterModal.styled';
import {
  Title,
} from 'components/baseStyles/CommonStyle.styled';
import { Backdrop, CloseBtn, Modal } from 'components/baseStyles/Modal.styled';
import { useTranslation } from 'react-i18next';
import { BtnAccent } from 'components/baseStyles/Button.styled';
import { createData } from 'services/APIservice';
import { onLoading, onLoaded } from 'helpers/Loader/Loader';
import { onFetchError, onSuccess } from 'helpers/Messages/NotifyMessages';
import { useState } from 'react';

export const RegisterModal = ({ event }) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const modal = useSelector(modalComponent);

  async function createOrder(values) {
    setIsLoading(true);
    try {
      const { data } = await createData(`/order`, values);
      if (!data) {
        return onFetchError('Whoops, something went wrong');
      } else { onSuccess('Thank you for your order');}
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const closeDataModal = e => {
    e.preventDefault();
    dispatch(cleanModal());
    closeModalWindow(e);
  };

  return createPortal(
    Object.values(modal)[0] === 'event' && (
      <Backdrop
        onClick={e => {
          if (e.currentTarget === e.target) closeDataModal(e);
        }}
      >
        <Modal onClick={e => e.stopPropagation()}>
          <CloseBtn
            type="button"
            onClick={e => closeDataModal(e)}
            aria-label="Close modal"
          >
            <MdClose />
          </CloseBtn>
          <MessageSection>
          {isLoading ? onLoading() : onLoaded()}
        <Title>
          {t('Реєстрація на подію')} {firstName(name)}?
        </Title>
        <Formik
          initialValues={{
            name: '',
            email: '',
            seats: '',
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            createOrder(values);
            setSubmitting(false);
            resetForm();
          }}
          enableReinitialize={true}
        >
          {({
            handleChange,
            handleSubmit,
            // setFieldValue,
            // resetForm,
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
              <FormLabel htmlFor="seats">
                  <FormName>{t('Місць')}</FormName>
                  <FormInputMessage
                    type="text"
                    name="seats"
                    id="seats"
                    placeholder={t('3')}
                    value={values.seats}
                    required
                    // onChange={e => {
                    //   setFieldValue('message', e.target.value);
                    // }}
                  />
                  {errors.state && touched.state ? (
                    <Error>{errors.state}</Error>
                  ) : null}
                </FormLabel>
                  <FormLabel htmlFor="name">
                    <FormName>{t('Ім’я')}</FormName>
                    <FormInput
                      type="text"
                      name="name"
                      id="name"
                      placeholder={name}
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
 
              </FieldsWrapper>
              <BtnAccent
                type="submit"
                disabled={isSubmitting}
                aria-label="Submit"
              >
                {t('Надіслати')}
              </BtnAccent>
            </FormList>
          )}
        </Formik>
      </MessageSection>
        </Modal>
      </Backdrop>
    ),
    document.querySelector('#popup-root'),
  );
};

RegisterModal.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};
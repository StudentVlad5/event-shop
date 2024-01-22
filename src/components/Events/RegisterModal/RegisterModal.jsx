// import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { Formik } from 'formik';
import { closeModalWindow } from '../../../hooks/ModalWindow';
import { cleanModal } from '../../../redux/modal/operation';
import { modalComponent } from '../../../redux/modal/selectors';
import {
  MessageSection,
  FormList,
  FormLabel,
  FormName,
  FormInput,
  Error,
  FieldsWrapper,
  TitleMes,
  FormInputSeats,
  QuantityWrapper,
  ArrowUpHandle,
  ArrowDownHandle,
  TitleMesBox,
} from './RegisterModal.styled';
import { Backdrop, CloseBtn, Modal } from 'components/baseStyles/Modal.styled';
import { useTranslation } from 'react-i18next';
import { BtnAccent } from 'components/baseStyles/Button.styled';
import { createData } from 'services/APIservice';
import { onFetchError, onSuccess } from 'helpers/Messages/NotifyMessages';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

export const RegisterModal = ({ activeEvents }) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modal = useSelector(modalComponent);
  const dispatch = useDispatch();

  const RegisterSchema = Yup.object().shape({
    seats: Yup.number()
      .positive()
      .integer()
      .max(
        activeEvents?.vacancies ? activeEvents?.vacancies : 50,
        'Not enough free places to book'
      )
      .required('Required'),
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  async function createOrder(values) {
    values.activeEventID = activeEvents.article_eventID;
    values.eventId = activeEvents.eventId;
    values.date = activeEvents.date;
    values.time = activeEvents.time;
    values.userName = values.name;
    values.userEmail = values.email;
    values.bookingSeats = values.seats;
    values.priceTotal = values.seats * activeEvents.price;
    setIsLoading(true);
    try {
      const { data } = await createData(`/orders`, values);
      if (!data) {
        onFetchError('Whoops, something went wrong');
      } else {
        onSuccess('Thank you for your order');
      }
    } catch (error) {
      setError(error);
    } finally {
      dispatch(cleanModal());
      closeModalWindow();
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
            <TitleMesBox>
              <TitleMes>{t('Реєстрація на подію')}</TitleMes>
            </TitleMesBox>
            <Formik
              initialValues={{
                name: '',
                email: '',
                seats: '1',
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                createOrder(values);
                setSubmitting(false);
                resetForm();
              }}
              enableReinitialize={true}
              validationSchema={RegisterSchema}
            >
              {({
                handleChange,
                handleSubmit,
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
                      <QuantityWrapper className="quantity-wrapper">
                        <FormInputSeats
                          type="number"
                          name="seats"
                          id="seats"
                          placeholder={t('1')}
                          value={values.seats}
                          required
                        />
                        <ArrowUpHandle
                          onClick={e => {
                            e.preventDefault;
                            values.seats = (
                              Number(values.seats) + 1
                            ).toString();
                          }}
                        />
                        <ArrowDownHandle
                          onClick={e => {
                            e.preventDefault;
                            values.seats = (
                              Number(values.seats) - 1
                            ).toString();
                          }}
                        />
                      </QuantityWrapper>
                      {errors.seats && touched.seats ? (
                        <Error>{errors.seats}</Error>
                      ) : null}
                    </FormLabel>
                    <FormLabel htmlFor="name">
                      <FormName>{t('Ім’я')}</FormName>
                      <FormInput
                        type="text"
                        name="name"
                        id="name"
                        placeholder={t('Джеймс')}
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
    document.querySelector('#popup-root')
  );
};

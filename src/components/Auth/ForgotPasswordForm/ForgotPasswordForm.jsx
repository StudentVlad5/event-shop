import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik, Formik } from 'formik';
import schemas from 'utils/schemas';
import { forgotPasswordAuth } from 'redux/auth/operations';
import { Section, Container } from 'components/baseStyles/CommonStyle.styled';
import { useNavigate } from 'react-router-dom';
import { theme } from 'components/baseStyles/Variables.styled.js';
import { onSuccess } from 'helpers/Messages/NotifyMessages.jsx';
import {
  FormInputLogin,
  FormStyled,
  TitleLogin,
  Btn,
  BoxText,
  StyledLink,
  ErrorBox,
} from '../LoginForm/LoginForm.styled.js';
import {
  FormLabel,
  Error,
  FormField,
} from 'components/baseStyles/Form.styled.js';
import { useTranslation } from 'react-i18next';

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmit = ({ values }) => {
    setIsLoading(true);
    const { email } = values;
    dispatch(
      forgotPasswordAuth({
        email,
      }),
    );
    onSuccess('password has been changed. Please check your email');
    setIsLoading(false);
    navigate(`/signin`);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schemas.changePasswordSchema,
    onSubmit: (values, action) => {
      onSubmit({ values, action });
    },
  });

  const isValid =
    (formik.errors.email && formik.touched.email) || formik.values.email === ''
      ? true
      : false;

  const showAccentValidateInput = (hasValue, isValide) => {
    return !hasValue
      ? null
      : isValide
      ? `${theme.colors.red}`
      : `${theme.colors.darkGreen}`;
  };

  return (
    <Section>
      <Container>
        <Formik validationSchema={schemas.changePasswordSchema}>
          <FormStyled onSubmit={formik.handleSubmit} autoComplete="off">
            <TitleLogin>{'Forgot Password'}</TitleLogin>
            <FormField>
              <FormLabel htmlFor="email">
                <span>{t('Email')}</span>
                {formik.errors.name && formik.touched.name ? (
                  <Error>{formik.errors.name}</Error>
                ) : null}
              </FormLabel>
              <FormInputLogin
                style={{
                  borderColor: showAccentValidateInput(
                    formik.values.email,
                    formik.errors.email,
                  ),
                }}
                name="email"
                type="email"
                value={formik.values.email}
                validate={schemas.changePasswordSchema.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <ErrorBox style={{ bottom: '22px' }}>
                  {formik.errors.email}
                </ErrorBox>
              ) : null}
            </FormField>

            <Btn
              style={{ height: 'auto' }}
              type="submit"
              disabled={isValid}
              aria-label="submit to change password"
            >
              {isLoading ? 'Loading' : 'Change'}{' '}
            </Btn>
            <BoxText>
              <span>{'Already have an account?'}</span>{' '}
              <StyledLink to="/login">{'Log In'}</StyledLink>
            </BoxText>
          </FormStyled>
        </Formik>
      </Container>
    </Section>
  );
};

export default ForgotPasswordForm;

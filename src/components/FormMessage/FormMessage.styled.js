import { Form, Field } from 'formik';
import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Section } from 'components/baseStyles/CommonStyle.styled';

export const FormList = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 45px;
    padding: 0 70px;
  }
`;

export const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 70px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
`;

export const FormLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export const FormName = styled.span`
  margin-bottom: 15px;

  font-family: ${theme.fonts[0]};
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${theme.colors.grey1};
`;

export const FormInput = styled(Field)`
  width: 100%;
  padding: 15px;

  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${theme.colors.grey2};

  background: ${theme.colors.white};
  border-color: transparent;
  border: 1px solid ${theme.colors.grey2};
  border-radius: 10px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    max-width: 530px;
    padding: 25px 30px;
  }

  &:focus-visible {
    border: 0.5px solid ${theme.colors.accent};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.grey2};
    font-family: ${theme.fonts[0]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Error = styled.span`
  position: absolute;
  bottom: -10px;
  right: 0;
  z-index: 2;

  font-family: ${theme.fonts[0]};
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  text-align: right;
  color: ${theme.colors.red};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 12px;
  }
`;

export const FormBtn = styled.button`
  position: absolute;
  bottom: 1px;
  right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;

  border: none;
  border-radius: 50%;
  background-color: transparent;

  cursor: pointer;
  transform: ${theme.transition};
  transition: ${theme.transition};

  &:hover,
  &:focus {
    background-color: ${theme.colors.fon};
  }
  &:disabled {
    svg {
      fill: ${theme.colors.grey1};
    }
  }

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    width: 32px;
    height: 32px;
    margin-left: 24px;
  }
`;

export const FormInputMessage = styled.textarea`
  height: 100%;
  padding: 15px;

  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${theme.colors.grey2};

  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey2};
  border-radius: 10px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    max-width: 530px;
    padding: 25px 30px;
  }

  &:focus-visible {
    border: 0.5px solid ${theme.colors.accent};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.grey2};
    font-family: ${theme.fonts[0]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

import { Form, Field } from 'formik';
import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Section, Title } from 'components/baseStyles/CommonStyle.styled';
import ArrowUp from '../../../images/arrow_up_24px.svg';
import ArrowDown from '../../../images/arrow_down_24px.svg';

export const MessageSection = styled(Section)`
  padding: 0;
`;

export const TitleMesBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const TitleMes = styled(Title)`
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 57.6px */
  margin-bottom: 15px;
  /* width: 245px; */
  padding-top: 20px;
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding-top: 0;
  }
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 48px;
    margin-bottom: 25px;
  }
`;

export const FormList = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 35px;
  }
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    gap: 20px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 35px;
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

  font-family: ${theme.fonts[1]};
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

  &:focus::placeholder {
    color: transparent;
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
export const FormInputSeats = styled(FormInput)`
  /* font-size: 36px; */
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding: 14px 30px 15px;
    /* font-size: 36px; */
  }
  /* &::placeholder {
    font-size: 36px;
  } */
  &::-webkit-outer-spin-button {
    height: 80px;
    opacity: 0;
    z-index: 500;
    cursor: pointer;
  }
  &::-webkit-inner-spin-button {
    height: 80px;
    opacity: 0;
    z-index: 500;
    cursor: pointer;
  }
`;

export const Error = styled.span`
  position: absolute;
  bottom: -20px;
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
export const QuantityWrapper = styled.div`
  position: relative;
`;

export const ArrowUpHandle = styled.div`
  position: absolute;
  right: 12px;
  height: 30px;
  width: 30px;
  top: 1px;
  background-image: url(${ArrowUp});
  background-size: 30px 30px;
  cursor: pointer;
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    height: 30px;
    width: 30px;
    right: 15px;
    background-size: 30px 30px;
  }
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    height: 30px;
    width: 30px;
    right: 17px;
    background-size: 30px 30px;
  }
`;

export const ArrowDownHandle = styled.div`
  position: absolute;
  right: 12px;
  height: 30px;
  width: 30px;
  bottom: -2px;
  background-image: url(${ArrowDown});
  background-size: 30px 30px;
  cursor: pointer;
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    height: 30px;
    width: 30px;
    right: 15px;
    background-size: 30px 30px;
  }
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    height: 30px;
    width: 30px;
    right: 17px;
    background-size: 30px 30px;
  }
`;

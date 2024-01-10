import { Form, Field } from 'formik';
import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Section } from 'components/baseStyles/CommonStyle.styled';

export const DescriptionSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    gap: 20px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 35px;
  }
`;

export const Image = styled.img`
  width: 182px;
  height: 216px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 350px;
    height: 403px;
  }
`;

export const EventsSection = styled(Section)`
  padding-top: 0;
`;

export const MessageSection = styled(Section)`
  padding-top: 0;
  padding-bottom: 75px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-bottom: 120px;
  }
`;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    flex-direction: row;
    justify-content: space-between;
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
  padding: 8px 30px 8px 20px;

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
    width: 530px;
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

import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const BtnLight = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 125px;
  padding: 13px 23px;
  margin: 0 auto;

  font-family: ${theme.fonts[1]};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${props => props.theme.black_text};
  text-transform: uppercase;

  background-color: ${props => props.theme.white_fon};
  border: 1px solid ${props => props.theme.white_fon};
  border-radius: 80px;
  cursor: pointer;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 14px;
    padding: 18px 33px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }

  &:hover,
  &:focus {
    background-color: ${props => props.theme.grey};
    border: 1px solid ${props => props.theme.grey};
  }
`;

export const BtnGrey = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 17px 27px;
  margin: 0 auto;
  width: 100%;

  font-family: ${theme.fonts[0]};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.6px;
  color: ${props => props.theme.white_text};
  text-transform: uppercase;
  letter-spacing: 1.6px;

  background-color: ${props => props.theme.grey};
  border-radius: 80px;
  cursor: pointer;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 14px;
    padding: 27px 32px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }

  &:hover,
  &:focus {
    color: ${props => props.theme.white_text};
    background-color: ${props => props.theme.black};
  }
`;

export const AnimationBtn = styled.button`
  position: relative;
  display: block;
  margin: 0 auto;
  padding: 2px;

  color: ${props => props.theme.white_text};
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 32.004px; /* 160.02% */
  text-transform: uppercase;

  background-color: transparent;
  border: none;
  /* border-bottom: 1px solid ${props => props.theme.white_text}; */
  transition: ${theme.transition};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 20px;
  }
  /* 
  &:hover,
  &:focus {
    color: ${props => props.theme.grey};
    border-bottom: 1px solid ${props => props.theme.grey};
  } */

  &::before,
  &::after,
  & span::after,
  & span::before {
    content: '';
    position: absolute;
    top: 100%;
    bottom: 0;
    left: -16px;
    width: 1px;
    background: ${props => props.theme.white_text};
    transition: ${theme.transition};
  }

  &::before {
    right: -16px;
    left: -16px;
    width: auto;
    background: 0;
    border-right: 1px solid ${props => props.theme.white_text};
    border-left: 1px solid ${props => props.theme.white_text};
  }

  &::after {
    right: 0;
    left: 0;
    height: 1px;
    width: auto;
  }

  & span {
    position: relative;
    display: inline-block;
    padding: 2px;

    &::before,
    &::after {
      top: 0;
      left: auto;
      right: auto;
      width: 0;
      height: 1px;
      transition: ${theme.transition};
    }

    &::before {
      left: -18px;
    }

    &::after {
      right: -18px;
    }
  }

  &:hover,
  &:focus {
    &::before {
      top: 2px;
    }
    &::after {
      right: -16px;
      left: -16px;
    }

    & span::before,
    & span::after {
      width: 50%;
    }
  }
`;

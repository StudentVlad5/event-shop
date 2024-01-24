import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { ReactComponent as Logo } from 'images/logo.svg';
import { ReactComponent as LogoMain } from 'images/logoMain.svg';

export const SLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;

  font-family: ${theme.fonts[1]};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${theme.colors.grey2};

  transition: ${theme.transition};
  text-decoration: none;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 24px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 34px;
  }
`;

export const LogoIcon = styled(LogoMain)`
  width: 135px;
  height: 100%;
  
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 100%;
    /* height: 100%; */
  }
`;

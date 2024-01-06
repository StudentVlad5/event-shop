import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

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

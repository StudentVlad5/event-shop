import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const Main = styled.main`
  padding-top: 70px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding-top: 100px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-top: 100px;
  }
`;

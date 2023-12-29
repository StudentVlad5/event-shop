import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const Main = styled.main`
  padding-top: 97px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding-top: 116px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-top: 116px;
  }
`;

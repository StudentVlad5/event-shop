import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 11;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;

  width: 100vw;
  height: 100vh;
  padding: 100px 50px 30px;

  background-color: ${theme.colors.fon};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const MobileNavigation = styled.nav`
  & > ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;

    & > li > a {
      color: ${theme.colors.greyHeader};

      font-family: ${theme.fonts[0]};
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      transition: ${theme.transition};
      text-decoration: none;

      &:hover,
      &:focus {
        padding-bottom: 1px;
        border-bottom: 1px solid ${theme.colors.greyHeader};
      }
    }
  }
`;

import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Container } from 'components/baseStyles/CommonStyle.styled';

export const SHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 15;

  width: 100vw;
  padding: 20px 50px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: ${theme.breakpoints.desktop};
    margin: 0 auto;
    padding: 30px 50px;
  }
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  text-align: left;
`;

export const Navigation = styled.nav`
  & > ul {
    display: none;

    @media screen and (min-width: ${theme.breakpoints.desktop}) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
    }

    & > li > a {
      color: ${theme.colors.grey2};

      font-family: ${theme.fonts[0]};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      transition: ${theme.transition};
      text-decoration: none;

      &:hover,
      &:focus {
        padding-bottom: 1px;
        border-bottom: 1px solid ${theme.colors.grey2};
      }
    }
  }
`;

export const WrapText = styled.div`
  display: none;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: block;
  }
`;

export const MenuBtn = styled.button`
  position: fixed;
  top: 20px;
  right: 50px;
  z-index: 15;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  color: ${theme.colors.grey2};
  background: transparent;
  border: none;

  cursor: pointer;
  transition: ${theme.transition};

  &:hover,
  &:focus {
    color: ${theme.colors.black};
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }

  & > svg {
    fill: currentColor;
  }
`;

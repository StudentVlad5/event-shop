import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Container } from 'components/baseStyles/CommonStyle.styled';

export const SFooter = styled.footer`
  background-color: ${theme.colors.white};
  /* border-top: 1px solid rgba(0, 0, 0, 0.17); */
`;

export const FooterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: ${theme.breakpoints.desktop};
    margin: 0 auto;
    padding: 30px 50px;
  }
`;

export const ContactsBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  padding-bottom: 30px;
`;

export const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;

  @media screen and (max-width: ${theme.breakpoints.tablet_only}) {
    width: 100%;
  }

  & > p {
    font-family: ${theme.fonts[0]};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${theme.colors.grey1};
  }

  & ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    justify-content: flex-end;
    gap: 30px;

    @media screen and (max-width: ${theme.breakpoints.tablet_only}) {
      width: 100%;
    }

    & li:last-of-type {
      display: flex;
      gap: 12px;
    }

    & a {
      color: ${theme.colors.grey2};
      text-decoration: none;
      transition: ${theme.transition};

      &:hover,
      &:focus {
        color: ${theme.colors.accent};
      }

      & > svg {
        fill: currentColor;
      }
    }
  }
`;

export const CopyrightBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;

  padding-top: 30px;
  border-top: 1px solid ${theme.colors.grey2};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    justify-content: space-between;
  }
`;

export const Copyright = styled.p`
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${theme.colors.black};
`;

export const Developers = styled.div`
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${theme.colors.black};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
  }

  & > a {
    font-weight: 500;
    color: ${theme.colors.black};
    text-decoration: none;
    transition: ${theme.transition};

    &:hover,
    &:focus {
      color: ${theme.colors.primary};
    }
  }
`;

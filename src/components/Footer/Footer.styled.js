import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Container } from 'components/baseStyles/CommonStyle.styled';

export const SFooter = styled.footer`
  /* position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 10; */

  background-color: ${theme.colors.white};
  border-top: 1px solid rgba(0, 0, 0, 0.17);
`;

export const FooterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 20px 50px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: ${theme.breakpoints.desktop};
    margin: 0 auto;
    padding: 30px 50px;
  }
`;

export const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  & > p {
    font-family: ${theme.fonts[0]};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: #9f9f9f;
  }

  & ul {
    display: flex;
    align-items: center;
    gap: 30px;

    & li:last-of-type {
      display: flex;
      gap: 12px;
    }

    & a {
      color: ${theme.colors.grey2};
      text-decoration: none;
    }
  }
`;

export const ContactsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 30px;
`;

export const CopyrightBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 30px;

  border-top: 1px solid #d9d9d9;
`;

export const Copyright = styled.p`
  font-family: ${theme.fonts[0]};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${theme.colors.black};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }
`;

export const Developers = styled.div`
  font-family: ${theme.fonts[0]};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${theme.colors.black};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }

  & > a {
    font-weight: 500;
    color: ${theme.colors.black};
    text-decoration: none;
  }
`;

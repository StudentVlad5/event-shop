import { useTranslation } from 'react-i18next';
import { Logo } from 'components/Header/Logo/Logo';
import sprite from 'images/sprite.svg';
import {
  SFooter,
  FooterContainer,
  Contacts,
  Copyright,
  Developers,
  ContactsBox,
  CopyrightBox,
} from './Footer.styled';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <SFooter id="contact">
      <FooterContainer>
        <ContactsBox>
          <Logo />
          <Contacts>
            <p>{t('Контакти')}</p>
            <ul>
              <li>
                <a href="mailto:test@gmail.com" aria-label="email">
                  test@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+123456789" aria-label="phone">
                  +123456789
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <svg width="24" height="24">
                    <use href={sprite + '#facebook'}></use>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <svg width="24" height="24">
                    <use href={sprite + '#instagram'}></use>
                  </svg>
                </a>
              </li>
            </ul>
          </Contacts>
        </ContactsBox>
        <CopyrightBox>
          <Copyright> &#169; 2023 BloomSkill</Copyright>
          <Developers>
            <span>Designed and Developed by </span>
            <a
              href="https://brand-maze.vercel.app/"
              aria-label="Brand Maze website"
            >
              Brand Maze
            </a>
          </Developers>
        </CopyrightBox>
      </FooterContainer>
    </SFooter>
  );
};

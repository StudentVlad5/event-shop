import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo/Logo';
import { Menu } from './Menu/Menu';
import Language from 'components/Header/Language/Language';
import sprite from 'images/sprite.svg';
import {
  SHeader,
  HeaderContainer,
  Navigation,
  Wrap,
  MenuBtn,
} from './Header.styled';

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleModal = () => {
    setShowMenu(state => !state);
  };

  showMenu && (document.querySelector('body').style.overflow = 'hidden');
  !showMenu && (document.querySelector('body').style.overflow = 'auto');

  const { t } = useTranslation();

  return (
    <>
      <SHeader>
        <HeaderContainer>
          <Logo />
          <Navigation>
            <ul>
              <li>
                <NavLink to="/" aria-label="Home" data-info="Home">
                  {t('Accueil')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/specialists"
                  aria-label="The team of specialists"
                  data-info="Team"
                >
                  {t('Les spécialistes')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/events"
                  aria-label="Events calendar"
                  data-info="Events calendar"
                >
                  {t('Caléndrier des evenements')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  aria-label="More information about us"
                  data-info="About"
                >
                  {t('A propos')}
                </NavLink>
              </li>
            </ul>
          </Navigation>
          <Wrap>
            <Language />
            <MenuBtn
              type="button"
              aria-label="Switch mobile menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
              onClick={toggleModal}
            >
              <svg width="30" height="30">
                {!showMenu ? (
                  <use href={sprite + '#menu_40px'}></use>
                ) : (
                  <use href={sprite + '#close_40px'}></use>
                )}
              </svg>
            </MenuBtn>
          </Wrap>
        </HeaderContainer>
      </SHeader>
      {showMenu && <Menu onClose={toggleModal} />}
    </>
  );
};

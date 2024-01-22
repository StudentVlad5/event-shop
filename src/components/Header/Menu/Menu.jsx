import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
// import { Logo } from '../Logo/Logo';
// import Language from '../Language/Language';
import { MobileMenu, MobileNavigation } from './Menu.styled';

export const Menu = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <MobileMenu id="mobile-menu">
      {/* <Logo /> */}
      <MobileNavigation onClick={() => onClose()}>
        <ul>
          <li>
            <NavLink to="/" aria-label={t('Accueil')} data-info="Home">
              {t('Accueil')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/specialists"
              aria-label={t('Les spécialistes')}
              data-info="Team"
            >
              {t('Les spécialistes')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              aria-label={t('Caléndrier des evenements')}
              data-info="Events calendar"
            >
              {t('Caléndrier des evenements')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              aria-label={t('A propos')}
              data-info="About"
            >
              {t('A propos')}
            </NavLink>
          </li>
        </ul>
      </MobileNavigation>
      {/* <Language /> */}
    </MobileMenu>
  );
};

Menu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

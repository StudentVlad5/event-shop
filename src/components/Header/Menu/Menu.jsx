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
            <NavLink to="/" aria-label="Home" data-info="Home">
              {t('Головна')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/specialists"
              aria-label="The team of specialists"
              data-info="Team"
            >
              {t('Спеціалісти')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              aria-label="Events calendar"
              data-info="Events calendar"
            >
              {t('Календар подій')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              aria-label="More information about us"
              data-info="About"
            >
              {t('Про нас')}
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

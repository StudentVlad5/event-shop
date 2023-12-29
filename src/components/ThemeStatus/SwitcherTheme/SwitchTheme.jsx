import React from 'react';
import { FiSun } from 'react-icons/fi';
import { HiMoon } from 'react-icons/hi';
import { ThemeContext } from 'components/ThemeStatus/ThemeProvider';
import { BtnChangeTheme, SwitcherWrapper } from './SwitchTheme.styled';

export const SwitchTheme = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme, setMode }) => (
        <SwitcherWrapper>
          <BtnChangeTheme
            onClick={() =>
              theme === 'light' ? setMode('dark') : setMode('light')
            }
          >
            {theme === 'light' ? (
              <FiSun size={18} alt="light theme" />
            ) : (
              <HiMoon size={18} alt="dark theme" />
            )}
          </BtnChangeTheme>
        </SwitcherWrapper>
      )}
    </ThemeContext.Consumer>
  );
};

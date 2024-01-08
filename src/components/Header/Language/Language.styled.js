import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const SelectContainerLanguage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  cursor: pointer;
`;

export const SelectLanguage = styled.select`
  width: auto;
  height: auto;
  padding: 3px;

  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;
  transition: ${theme.transition[0]};
  color: ${theme.colors.grey2};

  background: transparent;
  /* border-radius: 5px; */
  border-color: transparent;
  border: none;

  cursor: pointer;

  &:focus-visible {
    outline-color: transparent;
    outline-width: 0;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }
`;

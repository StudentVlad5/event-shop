import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ReactComponent as language } from 'images/events/language.svg';
import { ReactComponent as list } from 'images/events/list.svg';
import { ReactComponent as chair } from 'images/events/chair.svg';
import { ReactComponent as location } from 'images/events/location.svg';

export const FiltersBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 90px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin-top: 120px;
  }
`;

export const FiltersBtn = styled.button`
  display: flex;
  align-items: center;
  color: ${theme.colors.grey2};
  font-family: ${theme.fonts[0]};
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  text-transform: capitalize;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const ArrowIcon = styled(MdKeyboardArrowRight)`
  width: 30px;
  height: 30px;
  transform: rotate(90deg);
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const ArrowIconUp = styled(MdKeyboardArrowRight)`
  width: 30px;
  height: 30px;

  transform: rotate(-90deg);
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const FiltersMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: -15px;
  z-index: 1;
  background-color: ${theme.colors.fon};
  width: 215px;
  padding: 10px;
  border-radius: 0px 0px 20px 20px;
  border: 1px solid ${theme.colors.accent};
  border-top: 0px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const FiltersBtnMenu = styled.button`
  display: flex;
  align-items: center;
  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-transform: capitalize;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  transition: ${theme.transition};

  &:hover,
  &:focus {
    color: ${theme.colors.accent};
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
  }
`;

export const FiltersMenuOpen = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 5px;
  position: relative;
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    position: absolute;
    /* top: 60px; */
    z-index: 1;
    background-color: ${theme.colors.fon};
    width: inherit;
    padding: 10px;
    border-radius: 0px 0px 20px 20px;
    border: 1px solid ${theme.colors.accent};
    border-top: 0px;

    /* --triangle-width: calc((var(--menu-width) / 2) - 1px); */

    /* &::before {
      content: '';
      position: absolute;
      top: -26px;
      width: -webkit-fill-available;
      height: 0;
      border-left: 67px solid transparent;
      border-right: 69px solid transparent;
      border-bottom: 26px solid ${theme.colors.accent}; 
      border-left: var(--triangle-width) solid transparent;
      border-right: var(--triangle-width) solid transparent;
      border-bottom: 26px solid ${theme.colors.accent};
    } */
  }
`;

export const FiltersMenuOpenText = styled.p`
  color: ${theme.colors.grey2};
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  transition: ${theme.transition};
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${theme.colors.accent};
  }

  color: ${({ checked }) => (checked ? '#B4D2C8' : 'inherit')};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 20px;
  }
`;

export const FiltersMenuDesktop = styled.div`
  display: none;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: flex;
  }
`;

export const FiltersMenuDesktopBox = styled.div`
  margin-right: 0;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    &:not(:last-child) {
      margin-right: 80px;
    }
  }
`;

export const LanguageIcon = styled(language)`
  margin-right: 5px;
`;

export const ListIcon = styled(list)`
  margin-right: 5px;
`;

export const LocationIcon = styled(location)`
  margin-right: 5px;
`;

export const ChairIcon = styled(chair)`
  margin-right: 5px;
`;

export const FiltersMenuOpenLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
`;

export const FiltersMenuOpenInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${theme.colors.accent};
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  margin-right: 7px;

  &:checked {
    background-color: ${theme.colors.accent};
  }

  &::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FCF9F2' viewBox='0 0 24 24'%3E%3Cpath d='M9 16.17l-3.17-3.17-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
    display: block;
    transition: fill 0.2s ease-in-out;
  }
`;

export const FiltersMenuMobileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

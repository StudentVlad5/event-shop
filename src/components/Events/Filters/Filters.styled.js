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
  color: ${props => props.$props};
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
`;

export const ArrowIconUp = styled(MdKeyboardArrowRight)`
  width: 30px;
  height: 30px;

  transform: rotate(-90deg);
`;

export const ArrowMobileIcon = styled(MdKeyboardArrowRight)`
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  transform: rotate(90deg);
`;

export const ArrowMobileIconUp = styled(MdKeyboardArrowRight)`
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;

  transform: rotate(-90deg);
`;

export const FiltersMenuMobileBox = styled.div`
  color: ${props => props.$props};
  position: relative;
  &:last-child {
    padding-top: 7px;
  }
  &:not(:last-child) {
    padding: 7px 0;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      width: 180px;
      border-bottom: 1px solid ${theme.colors.grey2};
    }
  }
`;

export const FiltersMenu = styled.div`
  display: block;
  position: absolute;
  /* left: -15px; */
  z-index: 1;
  background-color: ${theme.colors.fon};
  width: 215px;
  padding: 20px 15px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.accent};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const FiltersBtnMenu = styled.button`
  display: flex;
  align-items: center;
  color: ${props => props.$props};
  font-family: ${theme.fonts[0]};
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-transform: capitalize;
  background-color: transparent;
  border-color: transparent;
  text-align: left;
  cursor: pointer;
  transition: ${theme.transition};
  padding: 0;

  &:hover {
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
  color: ${props => props.$props};
  gap: 5px;
  position: relative;
  margin-left: 5px;

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
    margin-left: 0;
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

  &:hover {
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
  stroke: ${props => props.$props};
  margin-right: 5px;
`;

export const ListIcon = styled(list)`
  stroke: ${props => props.$props};
  fill: ${props => props.$props};
  margin-right: 5px;
`;

export const LocationIcon = styled(location)`
  stroke: ${props => props.$props};
  fill: ${props => props.$props};
  margin-right: 5px;
`;

export const ChairIcon = styled(chair)`
  stroke: ${props => props.$props};
  fill: ${props => props.$props};
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

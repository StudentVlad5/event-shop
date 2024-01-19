import { css } from '@emotion/react';
import { theme } from 'components/baseStyles/Variables.styled';
import { MdKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';

export const FiltersBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
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
  /* @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: none;
  } */
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
`;

export const FiltersBtnMenu = styled.button`
  display: flex;
  align-items: center;
  color: ${theme.colors.grey2};
  font-family: ${theme.fonts[0]};
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  text-transform: capitalize;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
`;

export const FiltersMenuOpen = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const FiltersMenuOpenText = styled.p`
  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  text-align: center;
  /* ${({ isSelected }) =>
    isSelected &&
    `
    color: red; 
  `} */
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${theme.colors.accent};
  }
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 20px;
  }
`;

// export const FiltersBox = styled.div``;
// export const FiltersBox = styled.div``;
// export const FiltersBox = styled.div``;
// export const FiltersBox = styled.div``;
// export const FiltersBox = styled.div``;
// export const FiltersBox = styled.div``;
// export const FiltersBox = styled.div``;
// export const FiltersBox = styled.div``;
// export const FiltersBox = styled.div``;

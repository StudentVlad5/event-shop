import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const TeamList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;

  margin-top: 30px;
  margin-bottom: 50px;
  padding: 0 15px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    gap: 25px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 30px;
    padding: 0;
    margin-top: 70px;
    margin-bottom: 100px;
  }
`;

export const TeamListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
  }
`;

export const ItemImg = styled.img`
  width: 221px;
  height: 221px;
  border-radius: 110.5px;
  transition: ${theme.transition};

  &:hover,
  &:focus {
    transform: ${theme.scale};
  }
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  text-align: center;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 250px;
  }
`;

export const Name = styled.span`
  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 28.8px */

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
  }
`;

export const Describe = styled.p`
  color: ${theme.grey2};
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }
`;

export const BtnLink = styled(NavLink)`
  position: relative;
  padding: 2px;

  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */

  transition: ${theme.transition};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }

  &::before,
  &::after,
  & span::after,
  & span::before {
    content: '';
    position: absolute;
    top: 100%;
    bottom: 0;
    left: -16px;
    width: 1px;
    background: ${theme.colors.accent};
    transition: ${theme.transition};
  }

  &::before {
    right: -16px;
    left: -16px;
    width: auto;
    background: 0;
    border-right: 1px solid ${theme.colors.accent};
    border-left: 1px solid ${theme.colors.accent};
  }

  &::after {
    right: 0;
    left: 0;
    height: 1px;
    width: auto;
  }

  & span {
    position: relative;
    display: inline-block;

    &::before,
    &::after {
      top: -2px;
      left: auto;
      right: auto;
      width: 0;
      height: 1px;
      transition: ${theme.transition};
    }

    &::before {
      left: -18px;
    }

    &::after {
      right: -18px;
    }
  }

  &:hover,
  &:focus {
    &::before {
      top: 0;
    }
    &::after {
      right: -16px;
      left: -16px;
    }

    & span::before,
    & span::after {
      width: 60%;
    }
  }
`;

export const BtnMore = styled.button`
  position: relative;
  display: block;
  margin: 0 auto;
  padding: 2px;

  color: ${props => props.theme.white_text};
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 32.004px; /* 160.02% */
  text-transform: uppercase;

  background-color: transparent;
  border: none;
  transition: ${theme.transition};
  cursor: pointer;
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 20px;
  }

  &::before,
  &::after,
  & span::after,
  & span::before {
    content: '';
    position: absolute;
    top: 100%;
    bottom: 0;
    left: -16px;
    width: 1px;
    background: ${props => props.theme.white_text};
    transition: ${theme.transition};
  }

  &::before {
    right: -16px;
    left: -16px;
    width: auto;
    background: 0;
    border-right: 1px solid ${props => props.theme.white_text};
    border-left: 1px solid ${props => props.theme.white_text};
  }

  &::after {
    right: 0;
    left: 0;
    height: 1px;
    width: auto;
  }

  & span {
    position: relative;
    display: inline-block;
    padding: 2px;

    &::before,
    &::after {
      top: 0;
      left: auto;
      right: auto;
      width: 0;
      height: 1px;
      transition: ${theme.transition};
    }

    &::before {
      left: -18px;
    }

    &::after {
      right: -18px;
    }
  }

  &:hover,
  &:focus {
    &::before {
      top: 2px;
    }
    &::after {
      right: -16px;
      left: -16px;
    }

    & span::before,
    & span::after {
      width: 50%;
    }
  }
`;

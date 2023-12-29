import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import {
  DetailsWrapper,
  Event,
  EventImages,
} from '../EventsList/EventList.styled';

export const ArchiveList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  align-items: stretch;
  gap: 20px;

  padding: 0 15px;
  margin-bottom: 20px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    gap: 35px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 45px;
    padding: 0;
    margin-bottom: 50px;
  }
`;

export const ArchiveEvent = styled(Event)`
  flex-direction: column;
  max-width: 466px;
`;

export const ArchiveDetailsWrapper = styled(DetailsWrapper)`
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const ArchiveImage = styled(EventImages)`
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 466px;
    height: 100%;
    min-height: 256px;
    max-height: 366px;
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

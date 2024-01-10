import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: rgba(255, 255, 255, 0.5);
  transition: ${theme.transition};
  overflow-y: scroll;

  &.is-hidden {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }
`;

export const Modal = styled.div`
  position: relative;
  display: block;

  width: 90%;
  max-width: calc(100vw - 40px);
  padding: 30px 20px;
  margin: auto;

  background-color: ${theme.colors.black};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    max-width: 600px;
    padding: 35px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    max-width: 1020px;
    padding: 35px 130px;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 11;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  color: ${theme.colors.white};
  background-color: transparent;
  border: none;
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;

    @media screen and (min-width: ${theme.breakpoints.desktop}) {
      width: 40px;
      height: 40px;
    }
  }
`;
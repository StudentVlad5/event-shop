import styled from "styled-components";
import { theme } from "components/baseStyles/Variables.styled";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999 !important;

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
  padding: 15px 14px;
  margin: auto;
  border-radius: 23px;
  background-color: ${theme.colors.fon};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    width: 700px;
    height: 730px;
    padding: 65px 89px;  
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 700px;
    height: 730px;
    padding: 65px 89px;  
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
  color: ${theme.colors.grey2};
  background-color: transparent;
  border: none;
  cursor: pointer;

  & > svg {
    width: 18px;
    height: 18px;

    @media screen and (min-width: ${theme.breakpoints.desktop}) {
      width: 30px;
      height: 30px;
    }
  }
`;

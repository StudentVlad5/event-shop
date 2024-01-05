import styled, { keyframes } from 'styled-components';
import { theme } from './Variables.styled';

const puffInCenterAnimation = keyframes`
  0% {
    transform: scale(2);
    filter: blur(4px);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
`;

const Section = styled.section`
  position: relative;
  margin: 0 auto;
  padding: 30px 0;
  width: 100%;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding: 50px 0;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding: 70px 0;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding: 0 50px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    max-width: ${theme.breakpoints.desktop};
    padding: 0 80px;
  }
`;

const Title = styled.h1`
  font-family: ${theme.fonts[1]};
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  color: ${props => (props.$white ? theme.colors.fon : theme.colors.grey1)};

  animation: ${puffInCenterAnimation} 0.7s cubic-bezier(0.47, 0, 0.745, 0.715)
    both;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 36px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 40px;
  }
`;

const Headline = styled.h2`
  font-family: ${theme.fonts[0]};
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px;
  text-transform: capitalize;

  color: ${theme.colors.grey1};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 48px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 52px;
    line-height: 65px; /* 125% */
  }
`;

const Subtitle = styled.p`
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: center;

  color: ${props => (props.$white ? theme.colors.white : theme.colors.grey2)};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 18px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
    line-height: 39px; /* 162.5% */
  }
`;

export { Container, Section, Title, Headline, Subtitle };

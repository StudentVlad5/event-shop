import styled, { keyframes } from 'styled-components';

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
  padding: 50px 0;
  width: 100%;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding: 80px 0;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding: 100px 0;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding: 0 30px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    max-width: ${theme.breakpoints.desktop};
    padding: 0 45px;
  }
`;

const Title = styled.h1`
  font-family: ${theme.fonts[2]};
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 79.992px; /* 121.2% */
  letter-spacing: -1px;
  color: ${props => props.theme.white_text};

  animation: ${puffInCenterAnimation} 0.7s cubic-bezier(0.47, 0, 0.745, 0.715)
    both;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 42px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 56px;
  }
`;

const Headline = styled.h2`
  font-family: ${theme.fonts[0]};
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 55.02px; /* 114.625% */

  color: ${props => props.theme.white_text};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 24px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 48px;
  }
`;

const Subtitle = styled.p`
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 32.004px; /* 177.8% */
  text-align: center;

  color: ${props => props.theme.white_text};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 18px;
  }
`;

export { Container, Section, Title, Headline, Subtitle };

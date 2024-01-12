import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Container, Section } from 'components/baseStyles/CommonStyle.styled';

export const HeroSection = styled(Section)`
  padding: 0;
  /* background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  box-shadow: 10000px 4px 4px 0px rgba(70, 70, 70, 0.25) inset;
  filter: blur(7.5px); */
`;

export const HeroContainer = styled(Container)`
  padding: 0;

  & > picture {
    position: relative;
  }
`;

export const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  width: calc(100% - 60px);
  height: 100%;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    width: calc(100% - 80px);
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: calc(100% - 400px);
    max-width: ${theme.breakpoints.desktop};
  }
`;

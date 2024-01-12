import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Section } from 'components/baseStyles/CommonStyle.styled';

export const AboutSection = styled(Section)`
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
  }
`;

export const MessageSection = styled(Section)`
  padding-bottom: 75px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-bottom: 120px;
  }
`;

export const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 60px;
  }

  & li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;

    @media screen and (min-width: ${theme.breakpoints.desktop}) {
      flex-direction: row;
      gap: 60px;

      &:nth-of-type(2) {
        flex-direction: row-reverse;
      }
    }
  }
`;

export const Description = styled.p`
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${theme.colors.grey2};

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 20px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    max-width: 631px;
    font-size: 24px;
  }
`;

export const ImgBox = styled.div`
  width: 314px;
  height: 171px;
  overflow: hidden;
  border-radius: 29px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 545px;
    height: 257px;
  }
`;

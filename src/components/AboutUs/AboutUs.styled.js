import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Section } from 'components/baseStyles/CommonStyle.styled';

import about_1_jpg from 'images/about/about_1.jpg';
import about_1_webp from 'images/about/about_1.webp';
import about_2_jpg from 'images/about/about_2.jpg';
import about_2_webp from 'images/about/about_2.webp';

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

export const ImgBox1 = styled.div`
  width: 314px;
  height: 171px;
  overflow: hidden;
  border-radius: 29px;

  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;

  background-image: url(${about_1_jpg});
  background-image: -webkit-image-set(url(${about_1_webp}) 1x);

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 545px;
    height: 350px;
  }
`;

export const ImgBox2 = styled.div`
  width: 314px;
  height: 171px;
  overflow: hidden;
  border-radius: 29px;

  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;

  background-image: url(${about_2_jpg});
  background-image: -webkit-image-set(url(${about_2_webp}) 1x);

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 545px;
    height: 257px;
  }
`;

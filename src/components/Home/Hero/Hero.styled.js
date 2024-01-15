import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Container, Section } from 'components/baseStyles/CommonStyle.styled';

import hero_mob_png from 'images/hero/hero_mob.png';
import hero_mob_png_2x from 'images/hero/hero_mob@2x.png';
import hero_mob_webp from 'images/hero/hero_mob.webp';
import hero_mob_webp_2x from 'images/hero/hero_mob@2x.webp';

import hero_tab_png from 'images/hero/hero_tab.png';
import hero_tab_png_2x from 'images/hero/hero_tab@2x.png';
import hero_tab_webp from 'images/hero/hero_tab.webp';
import hero_tab_webp_2x from 'images/hero/hero_tab@2x.webp';

import hero_desk_png from 'images/hero/hero_desk.png';
import hero_desk_png_2x from 'images/hero/hero_desk@2x.png';
import hero_desk_webp from 'images/hero/hero_desk.webp';
import hero_desk_webp_2x from 'images/hero/hero_desk@2x.webp';

import hero_inf_png from 'images/hero/hero_inf.png';
import hero_inf_webp from 'images/hero/hero_inf.webp';

export const HeroSection = styled(Section)`
  width: 100%;
  height: 100%;
  min-height: 431px;
  padding: 0;

  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;

  background-image: url(${hero_mob_png});
  background-image: -webkit-image-set(url(${hero_mob_webp}) 1x);

  @media (min-device-pixel-ratio: 2),
    (min-resolution: 192dpi),
    (min-resolution: 2dppx) {
    background-image: url(${hero_mob_png_2x});
    background-image: -webkit-image-set(url(${hero_mob_webp_2x}) 2x);
  }

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    min-height: 354px;

    background-image: url(${hero_tab_png});
    background-image: -webkit-image-set(url(${hero_tab_webp}) 1x);

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: url(${hero_tab_png_2x});
      background-image: -webkit-image-set(url(${hero_tab_webp_2x}) 2x);
    }
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    min-height: 705px;

    background-image: url(${hero_desk_png});
    background-image: -webkit-image-set(url(${hero_desk_webp}) 1x);

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: url(${hero_desk_png_2x});
      background-image: -webkit-image-set(url(${hero_desk_webp_2x}) 2x);
    }
  }

  @media screen and (min-width: 1441px) {
    min-height: 800px;
    background-image: url(${hero_inf_png});
    background-image: -webkit-image-set(url(${hero_inf_webp}) 1x);
  }
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

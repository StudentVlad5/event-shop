import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Section } from 'components/baseStyles/CommonStyle.styled';
import { ViewportBox } from 'components/Home/TopEvents/TopEvents.styled';

export const DescriptionSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    gap: 20px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 35px;
  }
`;

export const Image = styled.img`
  width: 182px;
  height: 216px;
  /* border-radius: 8px; */

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 350px;
    height: 403px;
  }
`;

export const EventsSection = styled(Section)`
  padding-top: 0;
`;

export const SViewportBox = styled(ViewportBox)`
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    & .swiper-wrapper {
      justify-content: center !important;
    }
  }
`;

export const MessageSection = styled(Section)`
  padding-top: 0;
  padding-bottom: 75px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-bottom: 120px;
  }
`;

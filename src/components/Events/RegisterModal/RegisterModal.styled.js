import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { BtnLight } from 'components/baseStyles/Button.styled';
import {
  EventImages,
  EventTitle,
} from '../EventsList/EventList.styled';

export const SelectedEvent = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  max-height: 80px;

  border-radius: 40px;
  background: ${theme.colors.white};
  overflow: hidden;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    max-height: 120px;
  }
`;

export const SDataPlaceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 0;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    width: 100%;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin-bottom: 12px;
  }
`;

export const SDetailsWrapper = styled.div`
  padding: 5px 10px 5px 5px;
  width: 100%;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding: 15px 20px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: calc(100% - 256px);
  }
`;

export const SEventDate = styled.span`
  line-height: normal;
  color: ${theme.colord.grey};
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 32.004px; /* 228.6% */

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    line-height: 32.004px; /* 228.6% */
  }
`;

export const SEventImages = styled.img`
  width: 103px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    width: 30%;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 256px;
  }
`;

export const SEventTitle = styled.p`
color: ${theme.colors.black};
font-family: ${theme.fonts[0]};
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: 22.004px;

@media screen and (min-width: ${theme.breakpoints.desktop}) {
  font-size: 18px;
  line-height: 32.004px; /* 177.8% */
  margin-bottom: 0;
}
`;

export const SBtnLight = styled(BtnLight)`
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding: 18px 33px;
  }
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 190px;
    margin: 0 auto 0 0;
  }
`;
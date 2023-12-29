import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const EventTitle = styled.h1`
  margin-bottom: 20px;

  color: ${props => props.theme.white_text};
  font-family: ${theme.fonts[0]};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 25.992px; /* 127.756% */

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 30px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin-bottom: 30px;

    font-size: 36px;
    line-height: 45.992px; /* 127.756% */
    letter-spacing: -1px;
  }
`;

export const EventHeading = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;

  margin: 40px auto;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin: 40px auto 80px auto;
    max-width: 900px;
  }
`;

export const HeadingItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 22px;
  }
`;

export const HeadingItemTitle = styled.span`
  color: ${props => props.theme.grey};
  font-family: ${theme.fonts[0]};
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 12.02px; /* 80.133% */
  text-transform: uppercase;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 13px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 15px;
  }
`;

export const HeadingItemData = styled.span`
  color: ${props => props.theme.white_text};
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 12.02px; /* 60.1% */
  text-transform: uppercase;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 16px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 20px;
  }
`;

export const EventImage = styled.img`
  width: 100%;
  height: auto;
  margin: 0 auto;
  border-radius: 40px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    width: 80%;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 805px;
  }
`;

export const EventTextWrapper = styled.div`
  margin: 40px auto 45px auto;
  padding: 0 20px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    max-width: 900px;
  }
`;

export const EventDescrBox = styled.div`
  margin-bottom: 15px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    margin-bottom: 25px;
  }
`;

export const EventDescr = styled.p`
  color: ${props => props.theme.white_text};
  font-family: ${theme.fonts[0]};
  font-size: ${props => (props.$small ? '10px' : '12px')};
  font-style: normal;
  font-weight: 500;
  line-height: 22.004px; /* 177.8% */

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${props => (props.$small ? '12px' : '14px')};
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: ${props => (props.$small ? '16px' : '18px')};
    line-height: 32.004px; /* 177.8% */
  }
`;

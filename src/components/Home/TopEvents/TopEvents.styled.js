import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Section } from 'components/baseStyles/CommonStyle.styled';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

export const EventsSection = styled(Section)`
  padding-bottom: 75px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding-bottom: 120px;
  }
`;

export const BtnLinkText = styled(NavLink)`
  display: block;
  margin-bottom: 20px;
  padding-bottom: 2px;
  text-align: end;

  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  color: ${theme.colors.grey2};

  /* text-decoration: none; */
  transition: ${theme.transition};

  &:hover,
  &:focus {
    color: ${theme.colors.accent};
  }
`;

export const EventList = styled.ul`
  display: none;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
`;

export const EventListItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const ViewportBox = styled.div`
  display: ${props => (props.$mobile ? 'block' : 'none')};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    display: ${props => (props.$mobile ? 'none' : 'block')};
  }
`;

export const ItemImg = styled.img`
  width: 350px;
  height: 300px;
  /* border-radius: 40px; */

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 402px;
    height: 366px;
  }
`;

export const DetailsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 280px;
  height: 280px;
  padding: 40px 20px;

  border-radius: 40px;
  background: ${theme.colors.fon};

  animation: ${fadeInUp} 0.3s ease;
`;

export const Name = styled.span`
  font-family: ${theme.fonts[1]};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 24px */
  color: ${theme.colors.grey1};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
  }
`;

export const DateTimeWrapper = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 100%;

  & li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;

export const Head = styled.span`
  font-family: ${theme.fonts[0]};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 12.02px; /* 80.133% */
  text-transform: uppercase;
  text-align: center;
  color: ${theme.colors.grey2};
`;

export const DateTime = styled.span`
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 34px; /* 212.5% */
  text-transform: uppercase;
  text-align: center;
  color: ${theme.colors.grey1};
`;

export const Describe = styled.p`
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  color: ${theme.colors.grey2};
  text-align: center;
`;

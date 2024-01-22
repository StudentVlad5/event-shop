import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { NavLink } from 'react-router-dom';

export const EventTitle = styled.h1`
  color: ${props => props.theme.white_text};
  font-family: ${theme.fonts[0]};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 25.992px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: 30px;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    /* margin-bottom: 30px; */

    font-size: 36px;
    line-height: 45.992px;
    letter-spacing: -1px;
  }
`;

export const InfoBox = styled.div`
  position: relative;
  margin-top: 35px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin-top: 50px;
  }
`;

export const EventHeading = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 15px auto;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin: 0;
    padding: 15px 40px;
    gap: 40px;

    border-radius: 40px 0px 0px 0px;
    background-color: ${theme.colors.fon};

    position: absolute;
    top: 0px;
    left: 110px;
  }
`;

export const EventHeading2 = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 15px auto;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin: 0;
    padding: 15px 40px;
    gap: 40px;

    border-radius: 0px 0px 40px 0px;
    background-color: ${theme.colors.fon};

    position: absolute;
    bottom: 0px;
    right: 111px;
  }
`;

export const HeadingItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    gap: 15px;
  }
`;

export const HeadingItemTitle = styled.span`
  color: ${theme.colors.grey2};
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

export const HeadingItemDataBox = styled.div`
  display: flex;
`;

export const HeadingItemData = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 12.02px; /* 60.1% */
  text-transform: uppercase;

  /* &:not(:last-child) {
    margin-bottom: 10px;
  } */

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

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 1056px;
    height: 588px;
  }
`;

export const EventTextWrapper = styled.div`
  margin-top: 35px;
  margin-bottom: 45px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin-top: 40px;
    margin-bottom: 60px;
    max-width: 1123px;
  }
`;

export const EventDescrBox = styled.div`
  /* margin-bottom: 15px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    margin-bottom: 25px;
  } */
`;
export const EventDescrBoxTitle = styled.p`
  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[1]};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-top: 35px;
  margin-bottom: 10px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
    margin-top: 40px;
    margin-bottom: 15px;
  }
`;

export const EventDescr = styled.p`
  color: ${props => props.theme.white_text};
  font-family: ${theme.fonts[0]};
  font-size: ${props => (props.$small ? '10px' : '12px')};
  font-style: normal;
  font-weight: 500;
  line-height: 22.004px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${props => (props.$small ? '12px' : '14px')};
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: ${props => (props.$small ? '16px' : '18px')};
    line-height: 32.004px; /* 177.8% */
  }
`;

export const BtnBack = styled.button`
  all: unset;
  margin-bottom: 20px;

  display: inline-flex;
  align-items: center;
  gap: 5px;

  margin-right: auto;

  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  color: ${theme.colors.grey2};

  background-color: transparent;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${theme.colors.accent};
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
    margin-bottom: 30px;
  }
`;

export const ImgBthBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 35px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin-top: 30px;
  }
`;

export const NavLinkSpecialist = styled(NavLink)`
  color: ${theme.colors.grey2};
  font-family: ${theme.fonts[0]};
  /* ${props => (props.$small ? '10px' : '12px')}; */
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 22.004px;
  cursor: pointer;
  text-decoration: underline;
  transition: ${theme.transition};

  &:hover,
  &:focus {
    color: ${theme.colors.accent};
  }
  /* 
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${props => (props.$small ? '12px' : '14px')};
  } */

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: ${props => (props.$small ? '16px' : '18px')};
    line-height: 32.004px; /* 177.8% */
  }
`;
// export const ImgBthBox = styled.div``;

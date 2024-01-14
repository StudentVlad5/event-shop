import styled, { keyframes } from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

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

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px 30px;
`;

export const Event = styled.li``;

export const EventNavLink = styled.div`
  position: relative;
  cursor: pointer;
`;

export const EventImages = styled.img`
  width: 350px;
  height: 300px;
  border-radius: 40px;
  /* transition: ${theme.transition}; */

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 378px;
    height: 393px;
  }

  /* &:hover,
  &:focus {
    transform: ${theme.scale};
  } */
`;

export const EventDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  border-radius: 40px;
  background: #fcf9f2;
  padding: 25px 40px;

  animation: ${fadeInUp} 0.3s ease;
  display: ${props => (props.isHovered ? 'flex' : 'none')};

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 300px;
    padding: 25px 45px;
  }
`;

export const EventDetailTitle = styled.p`
  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[1]};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  text-align: center;
  margin-bottom: 15px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
  }
`;

export const DetailsBox = styled.div`
  display: flex;
`;

export const EventDetailDate = styled.ul`
  margin-right: 45px;
`;

export const EventDetailDateLi = styled.li``;

export const EventDetailDateText = styled.p`
  color: ${theme.colors.grey2};
  text-align: center;
  font-family: ${theme.fonts[0]};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 12.02px;
  text-transform: uppercase;
  margin-bottom: 7px;
`;

export const EventDetailDateText2 = styled.p`
  color: ${theme.colors.grey1};
  text-align: center;
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 34px;
  text-transform: uppercase;
`;

export const DetailsBoxDiscr = styled.p`
  color: ${theme.colors.grey2};
  text-align: center;
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  margin-top: 20px;
  margin-bottom: 25px;
`;

export const NoEvents = styled.p`
  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  margin-top: 20px;
  text-align: center;
`;

export const CleanFilterBtn = styled.button`
  color: ${theme.colors.grey2};
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  background-color: transparent;
  border-color: transparent;
  border-bottom: 1px solid ${theme.colors.grey2};
  cursor: pointer;
  
  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 20px;
  }
`;

// export const EventDetailTitle = styled.p``
// export const EventDetailTitle = styled.p``

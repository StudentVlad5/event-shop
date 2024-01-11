import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const TeamList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;

  margin-top: 30px;
  margin-bottom: 50px;
  padding: 0 15px;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding: 0;
    margin-top: 70px;
    margin-bottom: 100px;
  }
`;

export const TeamListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
  }
`;

export const ImgBox = styled.div`
  width: 221px;
  height: 221px;
  border-radius: 110.5px;
  overflow: hidden;
`;

export const ItemImg = styled.img`
  width: 221px;
  height: 221px;

  transition: ${theme.transition};

  &:hover,
  &:focus {
    transform: ${theme.scale};
  }
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  text-align: center;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    width: 250px;
  }
`;

export const Name = styled.span`
  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 28.8px */
  text-transform: capitalize;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
  }
`;

export const Describe = styled.p`
  color: ${theme.grey2};
  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }
`;

export const BtnMore = styled.button`
  position: relative;
  display: block;

  margin: 0 auto;
  padding: 9px 40px;

  font-family: ${theme.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 150% */
  text-transform: capitalize;
  color: ${theme.colors.grey2};

  background-color: transparent;
  border-radius: 7px;
  border: 1px solid ${theme.colors.grey2};

  transition: ${theme.transition};
  cursor: pointer;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 20px;
  }

  &:hover,
  &:focus {
    color: ${theme.colors.white};
    background-color: ${theme.colors.accent};
    border: 1px solid ${theme.colors.accent};
  }
`;

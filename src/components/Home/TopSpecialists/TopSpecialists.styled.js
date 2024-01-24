import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  margin-top: 25px;
`;

export const BtnPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 48px;
  flex-shrink: 0;

  color: ${theme.colors.primary};
  background-color: ${theme.colors.white};
  border-radius: 50%;
  filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.16));

  cursor: pointer;
  transition: ${theme.transition};
  user-select: none;

  &:hover,
  &:focus {
    filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.3));
  }
`;

export const TeamListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
  }
`;
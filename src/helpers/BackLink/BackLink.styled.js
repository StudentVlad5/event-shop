import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';

const GoBack = styled(Link)`
  all: unset;

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
  }
`;

export { GoBack };

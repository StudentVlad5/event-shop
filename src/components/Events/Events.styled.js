import styled from 'styled-components';
import { theme } from 'components/baseStyles/Variables.styled';
import { Section, Headline } from 'components/baseStyles/CommonStyle.styled';

export const EventsSection = styled(Section)`
  padding: 50px 0;

  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    padding: 80px 0;
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    padding: 100px 0;
  }
`;

export const Heading = styled(Headline)`
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    margin-top: 50px;
    margin-bottom: 40px;
    font-size: 42px;
  }
`;

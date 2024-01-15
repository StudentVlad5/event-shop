import { theme } from 'components/baseStyles/Variables.styled';
import styled from 'styled-components';
import { ReactComponent as calendar } from 'images/events/calendar.svg';

export const CalendarIcon = styled(calendar)`
display: none;
  @media screen and (min-width: ${theme.breakpoints.tablet}) {
    display: block;
    position: absolute;
    left: -85px;
    bottom: 0;
  }
`;

export const CalendarBox = styled.div`
  /* display: flex;
  justify-content: center; */
`;

export const CalendarDaysBox = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

export const CalendarDayBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CalendarDayBoxSpan = styled.span`
  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 9px;
  cursor: pointer;

  &.highlighted {
    background-color: black;
    color: white;
  }

  &:not(:last-child) {
    margin-right: 25px;

    @media screen and (min-width: ${theme.breakpoints.desktop}) {
      margin-right: 35px;
    }
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
    line-height: 120%;
  }
`;

export const CalendarDaysBoxSpan = styled.span`
  color: ${theme.colors.grey2};
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  &:not(:last-child) {
    margin-right: 21px;

    @media screen and (min-width: ${theme.breakpoints.desktop}) {
      margin-right: 30px;
    }
  }

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CalendarWeekDays = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CalendarDays = styled.div`
  /* display: grid;
  grid-template-columns: repeat(7, 1fr); */
`;

// export const CalendarBox = styled.div``;
// export const CalendarBox = styled.div``;
// export const CalendarBox = styled.div``;
// export const CalendarBox = styled.div``;
// export const CalendarBox = styled.div``;
// export const CalendarBox = styled.div``;
// export const CalendarBox = styled.div``;
// export const CalendarBox = styled.div``;
// export const CalendarBox = styled.div``;

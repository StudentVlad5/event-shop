import { useEffect, useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import PropTypes from "prop-types";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CalendarIcon } from "./Calendar.styled";
import { getFromStorage, saveToStorage } from "services/localStorService";

const Calendar = ({
  showDetailsHandle,
  activeEvents,
  currentWeek,
  setCurrentWeek,
}) => {
  const selectedDay = getFromStorage("selectedDate");
  const [currentMonth, setCurrentMonth] = useState(
    selectedDay ? selectedDay : new Date()
  );
  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    getWeek(currentMonth)
  );

  console.log(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(
    selectedDay ? selectedDay : new Date()
  );

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeekNumber(getWeek(subWeeks(currentMonth, 1)));
      getCurrentWeekDates(subWeeks(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeekNumber(getWeek(addWeeks(currentMonth, 1)));
      getCurrentWeekDates(addWeeks(currentMonth, 1));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
    saveToStorage("selectedDate", day);
  };

  const getCurrentWeekDates = (weekNumber) => {
    const weekDates = [];
    let startWeek = startOfWeek(weekNumber, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      weekDates.push(format(addDays(startWeek, i), "ccc dd MMM yy"));
    }
    saveToStorage("currentWeek", weekDates);
    setCurrentWeek(weekDates);
  };
  useEffect(() => getCurrentWeekDates(currentMonth), []);

  const renderHeader = () => {
    const dateFormat = "MMMMMMMMM yyyy";
    // console.log("selected day", selectedDate);
    return (
      <div className="header row flex-middle">
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell `}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span
              // className="number"
              className={`cell number ${
                isSameDay(day, new Date())
                  ? "today"
                  : isSameDay(day, selectedDay)
                  ? "selected"
                  : ""
              }`}
            >
              {formattedDate}
            </span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const renderFooter = () => {
    return (
      // header footer row flex-middle
      <div className="footer">
        {/* <div className='footer-box'> */}
        {/* col col-start */}
        <div className="btn-prev" onClick={() => changeWeekHandle("prev")}>
          {/* <div className="icon" onClick={() => changeWeekHandle('prev')}> */}
          <MdKeyboardArrowLeft size={30} />
        </div>
        {/* col col-end */}
        <div className="btn-next" onClick={() => changeWeekHandle("next")}>
          <MdKeyboardArrowRight size={30} />
        </div>
        {/* </div> */}
      </div>
    );
  };

  return (
    <div className="calendar-box">
      <div className="calendar">
        <CalendarIcon />

        {renderHeader()}
        {renderDays()}
        {renderCells()}
        {renderFooter()}
      </div>
    </div>
  );
};

export default Calendar;

Calendar.propTypes = {
  showDetailsHandle: PropTypes.any,
  activeEvents: PropTypes.arrayOf(PropTypes.shape({})),
  currentWeek: PropTypes.any,
  setCurrentWeek: PropTypes.any,
};

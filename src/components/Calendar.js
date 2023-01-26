import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from "react";

const Calendar = (props) => {
  const date = new Date();

  const currentMonthDays = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const nextMonthDays = new Date(
    date.getFullYear(),
    date.getMonth() + 2,
    0
  ).getDate();

  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const thisMonth = Array.from(
    { length: currentMonthDays },
    (_, i) => i + 1
  ).map((day) => {
    const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
    return (
      <li key={day}>
        {currentDay.getDate()} {monthNames[currentDay.getMonth()]}
      </li>
    );
  });

  const nextMonth = Array.from({ length: nextMonthDays }, (_, i) => i + 1).map(
    (day) => {
      const nextDay = new Date(date.getFullYear(), date.getMonth() + 1, day);
      return (
        <li key={day}>
          {nextDay.getDate()} {monthNames[nextDay.getMonth()]}
        </li>
      );
    }
  );

  useEffect(() => {
    props.numberOfCheckBox(parseInt(currentMonthDays + nextMonthDays)),
      [props.value];
  });

  return (
    <>
      <ul>
        {thisMonth}
        {nextMonth}
      </ul>
    </>
  );
};

export default Calendar;

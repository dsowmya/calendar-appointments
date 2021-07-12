import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
import Chip from "@material-ui/core/Chip";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { isSameMonth, isSameDay, getDate, format } from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    dayCell: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      cursor: "pointer",
      overflow: "hidden",
      alignContent: "start",
    },
    dayCellOutsideMonth: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      backgroundColor: "rgba( 211, 211, 211, 0.4 )",
      cursor: "pointer",
    },
    dateNumber: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "transparent",
    },
    todayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[400],
    },
    focusedAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "#f1f1f1",
    },
    focusedTodayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[800],
    },
    remindersContainer: {
      height: "100%",
    },
    agendaItem: {
      listStyle: "none",
      width: "80%",
      borderRadius: "2px",
      border: "1px solid gray",
      height: "20px",
      //padding: "5px 5px",
      margin: "3px",
      fontSize: "small",
      color: "white",
    },
  });

interface DateObj {
  date: Date;
}
interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
}

interface Props extends WithStyles<typeof styles> {
  calendarDate: Date;
  dateObj: DateObj;
  onDayClick: (dateObj: DateObj) => void;
  reminders: Array<Reminder>;
}

const CalendarDay = (props: Props) => {
  const { classes, dateObj, calendarDate, onDayClick, reminders } = props;
  const [focused, setFocused] = useState(false);

  const isToday = isSameDay(dateObj.date, new Date());
  const avatarClass =
    isToday && focused
      ? classes.focusedTodayAvatar
      : isToday
      ? classes.todayAvatar
      : focused
      ? classes.focusedAvatar
      : classes.dateNumber;

  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);

  let todaysReminders = reminders.filter(
    (i) => format(i.dateTime, "y-MM-dd") === format(dateObj.date, "y-MM-dd")
  );
  todaysReminders.sort((a, b) => {
    if (a.dateTime > b.dateTime) return 1;
    else if (a.dateTime < b.dateTime) return -1;
    else return 0;
  });

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => onDayClick(dateObj)}
      className={
        isSameMonth(dateObj.date, calendarDate)
          ? classes.dayCell
          : classes.dayCellOutsideMonth
      }
    >
      <Avatar className={avatarClass}>{getDate(dateObj.date)}</Avatar>
      <div className={classes.remindersContainer}>
        {todaysReminders && todaysReminders.length > 0
          ? todaysReminders.map((item) => (
              <Chip
                variant="outlined"
                style={{ backgroundColor: item.color, margin: "5px" }}
                label={
                  item.text.length > 15
                    ? item.text.substr(0, 12) + "..."
                    : item.text
                }
              ></Chip>
            ))
          : ""}
      </div>
    </div>
  );
};

export default withStyles(styles)(CalendarDay);

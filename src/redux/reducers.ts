import { combineReducers } from "redux";
import {
  OPEN_AGENDA,
  CLOSE_AGENDA,
  OPEN_ADD_REMINDER,
  CLOSE_ADD_REMINDER,
  ADD_REMINDER,
  //GET_REMINDERS,
} from "./actions";

interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
}

const initialRemindersState =
  //new Array<Reminder>(0);
  [
    {
      text: "School TOur",
      dateTime: new Date("2021-07-13T10:00:00"),
      color: "#e91e63",
    },
    {
      text: "Dance Class",
      dateTime: new Date("2021-07-13T18:00:00"),
      color: "#673ab7",
    },
    {
      text: "Meet Friends at our place",
      dateTime: new Date("2021-07-13T17:00:00"),
      color: "#0000ff",
    },
    {
      text: "School TOur",
      dateTime: new Date("2021-07-13T10:30:00"),
      color: "#e91e63",
    },
    {
      text: "Dance Class",
      dateTime: new Date("2021-07-13T20:00:00"),
      color: "#673ab7",
    },
    {
      text: "Meet Friends at our place",
      dateTime: new Date("2021-07-13T07:00:00"),
      color: "#0000ff",
    },
    {
      text: "School TOur",
      dateTime: new Date("2021-07-13T09:00:00"),
      color: "#e91e63",
    },
    {
      text: "Dance Class",
      dateTime: new Date("2021-07-13T06:00:00"),
      color: "#673ab7",
    },
    {
      text: "Meet Friends at our place",
      dateTime: new Date("2021-07-13T23:00:00"),
      color: "#0000ff",
    },
  ];

const initialAgendaState = {
  isOpen: false,
  date: null,
};

const initialAddReminderState = {
  isOpen: false,
};

function agendaStatus(state = { initialAgendaState }, action: any) {
  switch (action.type) {
    case OPEN_AGENDA:
      return {
        isOpen: true,
        date: action.dateObj.date,
      };
    case CLOSE_AGENDA:
      return {
        isOpen: false,
        date: null,
      };
    default:
      return state;
  }
}

function addReminderStatus(state = { initialAddReminderState }, action: any) {
  switch (action.type) {
    case OPEN_ADD_REMINDER:
      return {
        isOpen: true,
      };
    case CLOSE_ADD_REMINDER:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
}

function reminders(state = initialRemindersState, action: any) {
  switch (action.type) {
    case ADD_REMINDER:
      return [...state, action.reminder];
    /* 
      remindersState.list.push(action.reminder);
      return {
        remindersState,
      }; */

    /* case GET_REMINDERS:
      let agendaItems = remindersState.list;
      if (agendaItems && agendaItems.length > 0) {
        agendaItems = agendaItems.filter(
          (i) =>
            dateFns.format(i.dateTime, "y-MM-dd") ===
            dateFns.format(action.dateObj.date, "y-MM-dd")
        );
      }
      return { agendaItems };
 */
    default:
      return state;
  }
}

const calendarApp = combineReducers({
  agendaStatus,
  addReminderStatus,
  reminders,
});

export default calendarApp;

// action types
export const OPEN_AGENDA = "OPEN_AGENDA";
export const CLOSE_AGENDA = "CLOSE_AGENDA";
export const OPEN_ADD_REMINDER = "OPEN_ADD_REMINDER";
export const CLOSE_ADD_REMINDER = "CLOSE_ADD_REMINDER";
export const ADD_REMINDER = "ADD_REMINDER";
export const GET_REMINDERS = "GET_REMINDERS";

interface DateObj {
  date: Date;
}

interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
}

// action creators
export function openAgenda(dateObj: DateObj) {
  return { type: OPEN_AGENDA, dateObj };
}

export function closeAgenda() {
  return { type: CLOSE_AGENDA };
}

export function openAddReminder(reminder?: Reminder) {
  return { type: OPEN_ADD_REMINDER, reminder };
}

export function closeAddReminder() {
  return { type: CLOSE_ADD_REMINDER };
}

export function addReminder(reminder?: Reminder) {
  return { type: ADD_REMINDER, reminder };
}

export function getReminders(dateObj: DateObj) {
  return { type: GET_REMINDERS, dateObj };
}

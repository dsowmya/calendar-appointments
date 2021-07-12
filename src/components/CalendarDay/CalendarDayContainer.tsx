import { connect } from "react-redux";
import CalendarDay from "./CalendarDay";
import { openAgenda, getReminders } from "../../redux/actions";

interface Props {}
interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
}
interface State {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
    items: Array<Reminder>;
  };
  reminders: Array<Reminder>;
}

interface DateObj {
  date: Date;
}

const mapStateToProps = (state: State, ownProps: Props) => {
  let reminders = state.reminders; //state.agendaStatus.items;
  return { reminders, ...ownProps };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj) => {
      dispatch(getReminders(dateObj));
      dispatch(openAgenda(dateObj));
    },
  };
};

const CalendarDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDay);

export default CalendarDayContainer;

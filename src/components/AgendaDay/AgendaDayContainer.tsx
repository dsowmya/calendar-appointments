import { connect } from "react-redux";
import AgendaDay from "./AgendaDay";
import { closeAgenda } from "../../redux/actions";

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
  };
  reminders: Array<Reminder>;
}

const mapStateToProps = (state: State, ownProps: Props) => {
  const { agendaStatus, reminders } = state;

  return { agendaStatus, reminders, ...ownProps };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAgenda());
    },
  };
};

const AgendaDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaDay);

export default AgendaDayContainer;

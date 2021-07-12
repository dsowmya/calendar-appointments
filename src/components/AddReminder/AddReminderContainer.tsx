import { connect } from "react-redux";
import AddReminder from "./AddReminder";
import { closeAddReminder, addReminder } from "../../redux/actions";

interface State {
  addReminderStatus: {
    isOpen: boolean;
  };
}

interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
}

interface Props {}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { isOpen: state.addReminderStatus.isOpen, ...ownProps };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAddReminder());
    },
    onAddReminder: (rem: Reminder) => {
      dispatch(addReminder(rem));
    },
  };
};

const AddReminderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReminder);

export default AddReminderContainer;

import React, { useRef, useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ColorPicker from "../ColorPicker/ColorPicker";

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: "250px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    dateTimePicker: {
      width: "40%",
      margin: "10px",
    },
    positioningBox1: {
      display: "flex",
      flexDirection: "row",
    },
    colorPicker: {
      margin: "1rem",
    },
  });

interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
}

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  onClose: () => void;
  onAddReminder: (rem: Reminder) => void;
}

const AddReminder = (props: Props) => {
  const { classes, isOpen, onClose, onAddReminder } = props;

  let curDateStr = new Date().toISOString();
  curDateStr = curDateStr.substring(0, curDateStr.lastIndexOf(":"));

  const [reminderCharLeft, setReminderLength] = useState(30);
  const [selectedColor, setColor] = useState("");
  const [addMoreReminders, setAddMoreReminders] = useState(false);

  const selectedDateTime = useRef(null);
  const reminderText = useRef(null);

  const addReminderHandler = () => {
    let reminder: Reminder = {
      text: reminderText.current.value,
      dateTime: new Date(selectedDateTime.current.value),
      color: selectedColor,
    };
    onAddReminder(reminder);
    setAddMoreReminders(true);
    selectedDateTime.current.value = curDateStr;
    reminderText.current.value = "";
    setReminderLength(30);
    setColor("");
  };

  const reminderTextChanged = (event) => {
    const _reminderText = event.target.value;
    setReminderLength(30 - _reminderText.length);
  };

  const colorPickerHandler = (color) => {
    setColor(color.hex);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        Add Reminder
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.addReminderFormContainer}>
        <div className={classes.positioningBox1}>
          <TextField
            type="datetime-local"
            defaultValue={curDateStr}
            label="Select a Date and Time"
            className={classes.dateTimePicker}
            inputRef={selectedDateTime}
            //onChange={dateAndTimePickerHandler}
          ></TextField>
          {/* <span className={classes.colorPicker}> */}
          <ColorPicker colorPickerHandler={colorPickerHandler}></ColorPicker>
          {/*  </span> */}
        </div>
        <TextField
          id="reminder-text"
          label="Remind About"
          variant="outlined"
          margin="normal"
          fullWidth
          helperText={reminderCharLeft + " characters left!"}
          style={{ margin: 8 }}
          InputLabelProps={{ shrink: true }}
          onChange={reminderTextChanged}
          inputProps={{ maxLength: 30 }}
          inputRef={reminderText}
        ></TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={addReminderHandler}
        >
          Add Reminder
        </Button>
        {/* <Typography>
		2021-07-09T03:50
		2021-07-09T03:50:33.396Z
          Use this space to create the UI to add a reminder to the calendar.
        </Typography> */}

        <Dialog
          open={addMoreReminders}
          onClose={() => setAddMoreReminders(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Your reminder for ... is added. Have other reminders to Add ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddMoreReminders(false)} color="primary">
              Yes
            </Button>
            <Button
              onClick={() => {
                setAddMoreReminders(false);
                onClose();
              }}
              color="primary"
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AddReminder);

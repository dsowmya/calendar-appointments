import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
//import AddAlertIcon from "@material-ui/icons/AddAlert";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

import * as dateFns from "date-fns";

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      marginTop: "10px",
      overflow: "auto",
      maxHeight: "300px",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    toolbarButtonHidden: {
      visibility: "hidden",
    },
    toolbarButtonVisible: {
      visibility: "visible",
    },
    agendaItem: {
      listStyle: "none",
      width: "80%",
      borderRadius: "5px",
      border: "2px solid gray",
      height: "30px",
      padding: "5px 5px",
      margin: "10px",
      color: "white",
    },
  });

interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
}

interface Props extends WithStyles<typeof styles> {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
  };
  reminders: Array<Reminder>;
  onClose: () => void;
}

const AgendaDay = (props: Props) => {
  const { classes, agendaStatus, reminders, onClose } = props;
  const dateTitle = agendaStatus.date
    ? dateFns.format(agendaStatus.date, "LLLL do, yyyy")
    : "Closing";
  let agendaItems = new Array<Reminder>(); // = agendaStatus.items;
  if (reminders && reminders.length > 0) {
    /* reminders.map((r) => {
      console.log(r.dateTime);
    }); */

    agendaItems = reminders.filter((i) => {
      if (agendaStatus.date)
        return (
          dateFns.format(i.dateTime, "y-MM-dd") ===
          dateFns.format(agendaStatus.date, "y-MM-dd")
        );
      else return false;
    });
    agendaItems.sort((a, b) => {
      if (a.dateTime > b.dateTime) return 1;
      else if (a.dateTime < b.dateTime) return -1;
      else return 0;
    });
  }

  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        <ul>
          {agendaItems.length > 0
            ? agendaItems.map((item) => (
                <li
                  className={classes.agendaItem}
                  style={{ backgroundColor: item.color }}
                >
                  {/* <span style={{ color: item.color }}>
                    <AddAlertIcon color="inherit"></AddAlertIcon>
                  </span> */}
                  {item.text +
                    " at " +
                    dateFns.format(item.dateTime, "hh:mm aa")}
                </li>
              ))
            : "No Reminders."}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AgendaDay);

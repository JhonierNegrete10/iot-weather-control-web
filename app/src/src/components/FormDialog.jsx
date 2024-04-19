/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { postSetpoint } from "../utils/api";
export default function FormDialog({ deviceMac, urlBase, onSetpointUpdate }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const setpoint = formData.get("setpoint");

    try {
      console.log(deviceMac, setpoint, urlBase);
      const data = await postSetpoint(deviceMac, setpoint, urlBase);
      console.log(data);
      onSetpointUpdate(data.setpoint); // Callback to update setpoint in parent component
    } catch (error) {
      console.error("Error sending setpoint:", error);
    }

    handleClose();
  };
  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Typography
          variant="h6"
          fontSize="1.25rem"
          sx={{ textTransform: "none", color: "#000" }}
        >
          Ajustar setpoint
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Ajustar el Setpoint del dispositivo</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            dispositivo con MAC: {deviceMac}
          </Typography>
          <TextField
            autoFocus
            required
            margin="dense"
            id="setpoint"
            name="setpoint"
            label="Setpoint (0-100)"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{ min: 0, max: 100 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

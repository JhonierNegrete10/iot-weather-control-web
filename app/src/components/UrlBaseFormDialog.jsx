/* eslint-disable react/prop-types */
import  { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const UrlBaseFormDialog = ({ open, onClose }) => {
  const [urlbase, setUrlbase] = useState('0.0.0.0:8123');

  const handleChange = (event) => {
    setUrlbase(event.target.value);
  };

  const handleSubmit = () => {
    onClose(urlbase);
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)}>
      <DialogTitle>Update Urlbase</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Urlbase"
          fullWidth
          value={urlbase}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UrlBaseFormDialog;

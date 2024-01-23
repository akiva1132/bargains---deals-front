import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const CustomizedSnackbars = ({ open, setOpen, title }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> , title: string}) => {

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const stopPropagation = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          onClick={stopPropagation} // הוסף פונקציה המונעת התפשטות של האירוע לטלמנטים אחרים
          sx={{ width: '100%' }}
        >
          <div style={{ marginRight: "15px", marginLeft: "15px" }}>
            {title}
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
}

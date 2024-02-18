import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const DeleteDialog = ({ open, setOpen, carId }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, carId: string }) => {

    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("userDetails") || "").userId

    const token = localStorage.getItem("token2")
    const handleDelete = () => {
        console.log(carId, token);
        console.log(userId);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BASE_URL}/auction/car/${carId}/${userId}`,
            headers: {
                'Authorization': token
            },
        };
        axios.request(config)
            .then((response) => {
                navigate("/tradingArea/")
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"האם אתה בטוח שברצונך למחוק מודעה זו?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"לא יהיה ניתן לשחזר את המודעה לאחר המחיקה"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{"ביטול"}</Button>
                    <Button onClick={() => { handleClose(), handleDelete() }} autoFocus>
                        {"מחיקה"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
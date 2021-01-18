import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export default function SnackComponent(
    {text, severity = 'success', duration = 5000, open, handleClose}
    :{text?: string, severity?: string, duration?: number, open: boolean, handleClose: any}
) {
    
    return (
        <Snackbar open={open} autoHideDuration={duration}>
            <MuiAlert onClose={handleClose} severity="success">
                {text}
            </MuiAlert>
        </Snackbar>
    )
}
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";

import { useState } from "react";

export default function DialogView() {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Nuevo producto
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Registrar nuevo producto</DialogTitle>
                <DialogContent>
                    <DialogContentText>Llene los campos para completar su registro</DialogContentText>
                    
                </DialogContent>
            </Dialog>
        </div>
    )
}
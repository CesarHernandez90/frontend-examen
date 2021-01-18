import { 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,

} from "@material-ui/core";

import { useState } from "react";
import useSWR, { mutate } from "swr"

import { ELIMINAR_PRODUCTO, LISTAR_PRODUCTOS } from "../../config/api";

export default function AlertView(
    {id, name, handleOpenAlert}
    :{id: string, name: string, handleOpenAlert: any}
) {
    
    /* Dialog Functions */
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    /* Api Functions */
    const {data} = useSWR(LISTAR_PRODUCTOS);
    const handleSubmit = async () => {
        const res = await fetch(ELIMINAR_PRODUCTO+'/'+id, {method: 'delete'});
        if(res.ok) {
            const product = await res.json();
            handleOpenAlert('El producto ' + name + ' fue eliminado con éxito', 'info')
            mutate(LISTAR_PRODUCTOS, data.filter(p => p._id !== id), false)
        } else {

        }
    }

    return (
        <div>   
            <Button variant="contained" color="secondary" className="ml-2" onClick={handleClickOpen}>
                Eliminar
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-description">Eliminar producto</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Antes de continuar, por favor confirme que desea eliminar el producto con nombre "}
                        <span className="text-info">{name}</span>
                        {". Este proceso no es reversible."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button color="primary" onClick={handleSubmit}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
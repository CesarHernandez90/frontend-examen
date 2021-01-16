import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    MenuItem,
} from "@material-ui/core";

import { useState } from "react";
import { useFormik } from "formik";
import useSWR, { mutate } from "swr"
import { CREAR_PRODUCTO, LISTAR_PRODUCTOS } from "../../config/api";

export default function DialogView() {

    /* Caché */
    const {data} = useSWR(LISTAR_PRODUCTOS);

    /* Dialog Functions */
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        formik.resetForm();
    }

    /* Categorías */
    const categories = [
        { value: 'Bebidas', label: 'Bebidas'},
        { value: 'Limpieza', label: 'Limpieza'},
        { value: 'Botanas', label: 'Botanas'},
        { value: 'Cremería', label: 'Cremería'},
    ];

    /* Formik Functions */
    const formik = useFormik({
        initialValues: {
            NameProduct: '',
            ProductQuantity: '',
            Description: '',
            Category: 'Bebidas',
        },
        onSubmit: async values => {
            const res = await fetch(CREAR_PRODUCTO, {
                method: 'post',
                body: JSON.stringify(values),
                headers: {'Content-Type': 'application/json'}
            })
            if(res.ok) {
                const product = res.json();
                mutate(LISTAR_PRODUCTOS, [...data, product])
                formik.resetForm()
                setOpen(false)
            }
        },
        validate: values => {
            let errors:any = {};

            if(!values.NameProduct) errors.NameProduct = 'Requerido'
            if(!values.ProductQuantity) errors.ProductQuantity = 'Requerido'
            else if(Number(values.ProductQuantity) < 0) errors.ProductQuantity = 'Debe ser mayor que 0'
            if(!values.Description) errors.Description = 'Requerido'

            return errors;
        },
    })
    const handleClean = () => {
        formik.resetForm();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Nuevo producto
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title" className="pb-0">Registrar nuevo producto</DialogTitle>
                    <DialogContent>
                        <DialogContentText className="mb-4">Llene los campos para completar su registro</DialogContentText>
                        <TextField 
                            className="mb-3"
                            id="NameProduct" 
                            name="NameProduct" 
                            label="Nombre del producto"
                            type="text"
                            fullWidth
                            variant="outlined"
                            autoComplete="off"
                            error={formik.touched.NameProduct && formik.errors.NameProduct ? true : false}
                            helperText={formik.touched.NameProduct ? formik.errors.NameProduct : null}
                            onChange={formik.handleChange} 
                            value={formik.values.NameProduct}>
                        </TextField>
                        <TextField
                            className="mb-3"
                            id="Category"
                            name="Category" 
                            select
                            label="Categoría"
                            fullWidth
                            value={formik.values.Category}
                            onChange={formik.handleChange}
                            variant="outlined">
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            className="mb-3"
                            id="ProductQuantity" 
                            name="ProductQuantity" 
                            label="Cantidad"
                            type="number"
                            fullWidth
                            variant="outlined"
                            autoComplete="off"
                            error={formik.touched.ProductQuantity && formik.errors.ProductQuantity ? true : false}
                            helperText={formik.touched.ProductQuantity ? formik.errors.ProductQuantity : null}
                            onChange={formik.handleChange} 
                            value={formik.values.ProductQuantity}>
                        </TextField>
                        <TextField 
                            id="Description" 
                            name="Description" 
                            label="Descripción"
                            type="text"
                            fullWidth
                            variant="outlined"
                            autoComplete="off"
                            multiline
                            rows={4}
                            rowsMax={15}
                            error={formik.touched.Description && formik.errors.Description ? true : false}
                            helperText={formik.touched.Description ? formik.errors.Description : null}
                            onChange={formik.handleChange} 
                            value={formik.values.Description}>
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <div style={{flex: '1 0 0'}} >
                            <Button className="ml-3" onClick={handleClean}>Limpiar campos</Button>
                        </div>
                        <Button onClick={handleClose} color="default" variant="outlined">Cancelar</Button>
                        <Button type="submit" color="primary" variant="outlined" className="mr-3">Aceptar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}
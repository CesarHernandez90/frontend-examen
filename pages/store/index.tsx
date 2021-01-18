/* Componentes */
import LayoutComponent from '../../components/layout_component';
import TableView from '../../components/store/table_view';
import DialogView from "../../components/store/dialog_view";
import { LISTAR_PRODUCTOS } from "../../config/api"

/* API */
import IProduct from '../../models/product';
import { useState } from 'react';
import useSWR from 'swr';
import { Alert } from '@material-ui/lab';
import { Collapse, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Head from 'next/head';

import { Typography } from "@material-ui/core";

export default function Store(
    {products, isLoading, isError}
    :{products:IProduct[], isLoading:boolean, isError:any}
) {
    const {data} = useSWR(LISTAR_PRODUCTOS, {initialData: products});

    /* Alert Functions */
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const [openAlert, setOpenAlert] = useState(false)
    const handleOpenAlert = (message: string, severity: string) => {
        setMessage(message)
        setSeverity(severity)
        setOpenAlert(true)
    }
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    if(isError != null) return <p>Hubo un error al acceder a la ruta</p>
    if (isLoading) return <p>Cargando...</p>
    
    return (
        <div>
            <Head><title>STORE</title></Head>
            <LayoutComponent>
                <div className="d-flex justify-content-between align-items-center">
                    <Typography variant="h5">Productos</Typography>
                    <DialogView handleOpenAlert={handleOpenAlert}></DialogView>
                </div>
                <hr/>
                <Collapse in={openAlert}>
                    <Alert severity={severity as any} className="mb-3" action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseAlert}>
                            <CloseIcon fontSize="inherit"></CloseIcon>
                        </IconButton>
                    }>{message}</Alert>
                </Collapse>
                <TableView products={data} handleOpenAlert={handleOpenAlert}></TableView>
            </LayoutComponent>
        </div>
    );
}

export async function getStaticProps() {    
    const res = await fetch(LISTAR_PRODUCTOS)
    const products = await res.json()
    
    return { props: {
        products,
        isLoading: !products,
        isError: products.error ? products.error: null,
    }}
  }
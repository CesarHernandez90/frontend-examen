/* Componentes */
import LayoutComponent from '../../components/layout_component';
import TableView from '../../components/store/table_view';
import DialogView from "../../components/store/dialog_view";

/* API */
import { LISTAR_PRODUCTOS } from "../../config/api"
import IProduct from '../../models/product';
import useSWR from 'swr';

import { Button, Typography } from "@material-ui/core";

export default function Store(
    {products, isLoading, isError}
    :{products:IProduct[], isLoading:boolean, isError:any}
) {
    const {data} = useSWR(LISTAR_PRODUCTOS, {initialData: products});

    if(isError != null) return <p>Hubo un error al acceder a la ruta</p>
    if (isLoading) return <p>Cargando...</p>
    
    return (
        <div>
            <LayoutComponent>
                <div className="d-flex justify-content-between align-items-center">
                    <Typography variant="h5">Productos</Typography>
                    <DialogView></DialogView>
                </div>
                <hr/>
                <TableView products={data}></TableView>
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
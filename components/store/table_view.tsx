import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Button,
} from "@material-ui/core"
import { mutate } from "swr"
import { useState } from "react";

import { LISTAR_PRODUCTOS, ELIMINAR_PRODUCTO } from "../../config/api"
import IProduct from "../../models/product"

export default function TableView({products}:{products:IProduct[]}) {

    /* Columnas */
    const columns = [
        { id: 'ProductQuantity', label: 'Cantidad'},
        { id: 'NameProduct', label: 'Nombre del producto'},
        { id: 'Category', label: 'Categoría'},
        { id: 'actions', label: ''},
    ]

    /* Eliminar un producto */
    const deleteProduct = async(id: string) =>{
        const res = await fetch(ELIMINAR_PRODUCTO+'/'+id, {method: 'delete'});
        if(res.ok) {
            const product = await res.json();
            await console.log('product result:', product);
            mutate(LISTAR_PRODUCTOS, products.filter(p => p._id !== id), false)
        }
        
    }

    /* Paginación */
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage)

    return (
        <div>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page* rowsPerPage + rowsPerPage)
                            .map((product, index) => (
                                <TableRow key={product._id}>
                                    <TableCell>{product.ProductQuantity}</TableCell>
                                    <TableCell>{product.NameProduct}</TableCell>
                                    <TableCell>{product.Category}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary" className="mr-2">Editar</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteProduct(product._id)}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 69 * emptyRows}}>
                                <TableCell colSpan={6}></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}>
            </TablePagination>
        </div>
    )
}
import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Grid,
} from "@material-ui/core"
import { useState } from "react";

import IProduct from "../../models/product"
import DialogView from './dialog_view';
import AlertView from './alert_view';

export default function TableView(
    {products, handleOpenAlert}
    :{products:IProduct[], handleOpenAlert: any}
) {

    /* Columnas */
    const columns = [
        { id: 'ProductQuantity', label: 'Cantidad'},
        { id: 'NameProduct', label: 'Nombre del producto'},
        { id: 'Category', label: 'Categoría'},
        { id: 'actions', label: ''},
    ]

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
    const emptyRows = rowsPerPage == 5 || rowsPerPage == 7 
        ? rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage) : 0

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
                                    <TableCell align="right" className="d-flex align-items-center">
                                        <AlertView id={product._id} name={product.NameProduct} handleOpenAlert={handleOpenAlert}></AlertView>
                                        <DialogView product={product} handleOpenAlert={handleOpenAlert}></DialogView>
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
                rowsPerPageOptions={[5, 7, 15, 25]}
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
import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Grid,
    TextField,
    MenuItem,
} from "@material-ui/core"
import { useState } from "react";

import IProduct from "../../models/product"
import DialogView from './dialog_view';
import AlertView from './alert_view';
import useSWR, { mutate, trigger } from "swr";
import { LISTAR_PRODUCTOS } from "../../config/api";

export default function TableView(
    {products, handleOpenAlert}
    :{products:IProduct[], handleOpenAlert: any}
) {
    /* Columnas */
    const columns = [
        { id: 'ProductQuantity', label: 'Cantidad', class: 'd-none d-md-table-cell'},
        { id: 'NameProduct', label: 'Nombre del producto', class: ''},
        { id: 'Category', label: 'Categoría', class: 'd-none d-sm-table-cell'},
        { id: 'Description', label: 'Descripción', class: 'd-none d-lg-table-cell'},
        { id: 'actions', label: '', class: ''},
    ]

    /* Categorías */
    const categories = [
        { value: 'Todas', label: 'Todas'},
        { value: 'Bebidas', label: 'Bebidas'},
        { value: 'Limpieza', label: 'Limpieza'},
        { value: 'Botanas', label: 'Botanas'},
        { value: 'Cremería', label: 'Cremería'},
    ];

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

    /* Api Functions */
    const {data} = useSWR(LISTAR_PRODUCTOS);

    const [category, setCategory] = useState('Todas')
    const handleChangeCategory = (event) => {
        setCategory(event.target.value)
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        className="mb-3"
                        id="Category"
                        name="Category" 
                        select
                        label="Categoría"
                        fullWidth
                        defaultValue="Todas"
                        value={category}
                        onChange={handleChangeCategory} 
                        variant="outlined">
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-search" 
                        label="Nombre del producto" 
                        type="search" 
                        variant="outlined" 
                        fullWidth/>
                </Grid>
            </Grid>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} className={column.class}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page* rowsPerPage + rowsPerPage)
                            .map((product, index) => (
                                <TableRow key={product._id}>
                                    <TableCell className="d-none d-md-table-cell">{product.ProductQuantity}</TableCell>
                                    <TableCell>{product.NameProduct}</TableCell>
                                    <TableCell className="d-none d-sm-table-cell">{product.Category}</TableCell>
                                    <TableCell className="d-none d-lg-table-cell">{product.Description}</TableCell>
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
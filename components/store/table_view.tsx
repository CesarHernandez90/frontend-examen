import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button
} from "@material-ui/core"
import { trigger, mutate } from "swr"

import { LISTAR_PRODUCTOS, ELIMINAR_PRODUCTO } from "../../config/api"
import IProduct from "../../models/product"

export default function TableView({products}:{products:IProduct[]}) {

    const columns = [
        { id: 'ProductQuantity', label: 'Cantidad'},
        { id: 'NameProduct', label: 'Nombre del producto'},
        { id: 'Category', label: 'Categoría'},
        { id: 'actions', label: ''},
    ]

    const deleteProduct = async(id: string) =>{
        const res = await fetch(ELIMINAR_PRODUCTO+'/'+id, {method: 'delete'});
        if(res.ok) {
            const product = await res.json();
            await console.log('product result:', product);
            mutate(LISTAR_PRODUCTOS, products.filter(p => p._id !== id), false)
        }
        
    }

    return (
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
                    {products.map((product) => (
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
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
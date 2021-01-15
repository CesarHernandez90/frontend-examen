const API = process.env.NEXT_PUBLIC_HOSTNAME + ':' + process.env.NEXT_PUBLIC_PORT;

export const LISTAR_PRODUCTOS = API + '/listarTodosLosProductos';
export const ELIMINAR_PRODUCTO = API + '/eliminarUnProducto';
export const CREAR_PRODUCTO = API + '/crearUnProducto';
import useGet from "../../../hooks/useGet";
import { useNavigate } from "react-router-dom";
import "./principal.css";
import Tabla from "../tabla/Tabla";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import ModalProducto from "../modal/ModalProducto";
import { Contexto } from "../../Contexto";
import usePost from '../../../hooks/usePost'

const Principal = () => {
  const { loading, acceso, data } = useGet("http://localhost:3500/principal/");
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(false); // Si la seleccion esta activa quiere decir que va a eliminar al menos en esta version es la unica accion que se puede hacer.
  const [idSeleccionados, setIdSeleccionados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)  // No almacena el producto, almancena el Id, se debe de cambiar el nombre
  const [productos, setProductos] = useState([])
  const [mostrarModalAnadir, setMostrarModalAnadir] = useState(false)
  const { sendPostRequest } = usePost();
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false)
  const [total, setTotal] = useState(0)

  if (acceso === false && loading === false) {
    navigate("/login", { replace: true });
    return;
  }

  useEffect(() => {
    setProductos(data);
  }, [data])

  const eliminarFilas = () => {
    setSeleccion(true);
  };

  const cerrarModalAnadir = () => {
    setMostrarModalAnadir(false)
  }

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false)
  }

  const confirmarEliminar = async () => {
    const informacion = await fetch('http://localhost:3500/principal/', {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: idSeleccionados })
    })

    const informacionJson = await informacion.json();
    if (informacionJson.acceso) {
      const copiaProductos = productos.filter((producto) => !idSeleccionados.includes(producto.id))
      setProductos(copiaProductos)
      setIdSeleccionados([])
      setSeleccion(false)
    }
  }

  // Acciones con la tabla.
  const seleccionarEliminarFila = (id) => {
    if (idSeleccionados.includes(id)) return;
    setIdSeleccionados(prev => [...prev, id]);
  };

  const eliminarSeleccion = (id) => {
    if (idSeleccionados.length > 0) {
      const seleccionados = idSeleccionados.filter((idSeleccionado) => idSeleccionado !== id);
      setIdSeleccionados(seleccionados);
    }
  };

  const seleccionarFila = (producto) => {
    setProductoSeleccionado(producto);
  }

  const anadirProducto = () => {
    setMostrarModalAnadir(true)
  }

  const editarProducto = () => {
    setMostrarModalEditar(true)
  }

  const agregarProducto = async (e, producto) => {
    e.preventDefault()
    if (!producto.nombre || !producto.precio_unidad || !producto.existente || !producto.actual || !producto.vendido) return

    productos.length > 0 ? setProductos(productos => [...productos, producto]) : setProductos([...[], producto])
    cerrarModalAnadir()
    await sendPostRequest('http://localhost:3500/principal/agregarProducto', producto);
  }

  const editarProductoSeleccionado = async (e, nuevoProducto) => {
    e.preventDefault()
    // Creo el codigo de un put.
    const productoActualizado = actualizarProductoExistente(nuevoProducto);

    const solicitud = await fetch("http://localhost:3500/principal/actualizarProducto", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productoActualizado)
    })
    const respuestaSolicitud = await solicitud.json();
    console.log(respuestaSolicitud)
    if (respuestaSolicitud.acceso) {
      console.log("Producto Editado correctamente")
    }
  }


  const actualizarProductoExistente = (nuevoProducto) => {
    const nuevoProductoCreado = { id: productoSeleccionado.id, ...nuevoProducto }
    const copiaProductos = productos.map((producto) => producto.id === productoSeleccionado.id ? nuevoProductoCreado : producto)
    setProductos(copiaProductos) // Establece el valor del array con el nuevo valor.
    setProductoSeleccionado(nuevoProductoCreado)
    cerrarModalEditar()
    return nuevoProductoCreado;
  }

  useEffect(() => { // se calculan precios solo si productos cambia}
    let total = 0;
    productos?.map(producto => {
      total += producto.precio_unidad * producto.existente
    })

    setTotal(prev => prev = total)
  }, [productos])

  return (
    <Contexto.Provider value={{ productos, setProductos, productoSeleccionado, seleccion, setSeleccion }}>
      <div className="principal flex-center">
        <h1 className="titulo">Lista de Productos</h1>
        {loading === true && <h2>Cargando...</h2>}
        {acceso == true && productos && (
          <div className="principal-wrapper flex-center">
            {
              <Tabla
                seleccionarEliminarFila={seleccionarEliminarFila}
                eliminarSeleccion={eliminarSeleccion}
                seleccionarFila={seleccionarFila}
              />
            }
          </div>
        )}

        <div className="opciones">
          <div className="control-informacion">
            <button className="mostrar-informacion">Atras</button>
            <button className="mostrar-informacion">Siguiente</button>
          </div>

          <div className="opciones-informacion">
            {!seleccion && (
              <span className="icono anadir" onClick={anadirProducto}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#353b3a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
            )}

            {productoSeleccionado && (
              <span className="icono anadir" onClick={editarProducto} >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#353b3a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                </svg>
              </span>
            )}

            {seleccion && (
              <span className="icono eliminar" onClick={() => setSeleccion(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#353b3a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            )}
            {seleccion && (
              <span className="icono aceptar" onClick={confirmarEliminar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#353b3a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            )}
            {!seleccion && (
              <span className="icono eliminar" onClick={eliminarFilas}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#353b3a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </span>
            )}
          </div>
        </div>
        {/** Modal para anadir el producto */}
        {mostrarModalAnadir && <ModalProducto cerrarModal={cerrarModalAnadir} funcionModal={agregarProducto} />}
        {/** Modal para editar el producto */}
        {mostrarModalEditar && <ModalProducto cerrarModal={cerrarModalEditar} funcionModal={editarProductoSeleccionado} productoSeleccionado={productoSeleccionado} />}
        <div className="flex-center" style={{flexDirection: 'column'}}>
          <span className="venta-total">Total a recibir: Q{total}</span>
          {productoSeleccionado && <span className="venta-total">Total producto seleccionado: Q{productoSeleccionado.precio_unidad * productoSeleccionado.existente}</span>}
        </div>

      </div>
    </Contexto.Provider>

  );
}

export default Principal;
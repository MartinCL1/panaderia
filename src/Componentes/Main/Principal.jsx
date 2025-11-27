import useGet from "../../../hooks/useGet";
import { useNavigate } from "react-router-dom";
import "./principal.css";
import Tabla from "../tabla/Tabla";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import Anadir from "../modal/Anadir";
import { Contexto } from "../../Contexto";

const Principal = () => {
  const { loading, acceso, data } = useGet("http://localhost:3500/principal");
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(false); // Si la seleccion esta activa quiere decir que va a eliminar al menos en esta version es la unica accion que se puede hacer.
  const [idSeleccionados, setIdSeleccionados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productos, setProductos] = useState([])
  const [mostrarAnadir, setMostrarAnadir] = useState(false)

  if (acceso === false && loading === false) {
    navigate("/login", { replace: true });
    return;
  }

  useEffect(() => {
    setProductos(data)
  }, [data])

  const eliminarFilas = () => {
    setSeleccion(true);
  };

  const cerrarModal = () => {
    setMostrarAnadir(false)
  }

  const confirmarEliminar = async () => {

    const informacion = await fetch('http://localhost:3500/principal', {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: idSeleccionados })
    })

    const informacionJson = await informacion.json();
    if (informacionJson.acceso) {
      setProductos(productos.filter((producto) => !idSeleccionados.includes(producto.id)))
      setIdSeleccionados([])
    }
  };

  // Acciones con la tabla.
  const seleccionarEliminarFila = (id) => {
    if (idSeleccionados.includes(id)) return;
    setIdSeleccionados([...idSeleccionados, id]);
  };

  const eliminarSeleccion = (id) => {
    if (idSeleccionados.length > 0) {
      const seleccionados = idSeleccionados.filter((idSeleccionado) => idSeleccionado !== id);
      setIdSeleccionados(seleccionados);
    }
  };

  const seleccionarFila = (id) => {
    setProductoSeleccionado(id);
  }

  const anadirProducto = () => {
    setMostrarAnadir(true)
  }

  const anadirproducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto])
  }

  return (
    <Contexto.Provider value={{ productos, setProductos }}>
      <div className="principal flex-center">
        <h1 className="titulo">Lista de Productos</h1>
        {loading === true && <h2>Cargando...</h2>}
        {acceso == true && productos && (
          <div className="principal-wrapper flex-center">
            {
              <Tabla
                mostrarSeleccion={seleccion}
                productos={productos}
                seleccionarEliminarFila={seleccionarEliminarFila}
                eliminarSeleccion={eliminarSeleccion}
                idSeleccionado={productoSeleccionado}
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

            {!seleccion && (
              <span className="icono anadir" >
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

        {mostrarAnadir && <Anadir cerrarModal={cerrarModal} anadirProducto={anadirproducto} />}

      </div>
    </Contexto.Provider>
  );
}

export default Principal;

import useGet from "../../../hooks/useGet";
import { useNavigate } from "react-router-dom";
import "./principal.css";
import Tabla from "../tabla/Tabla";
import { useState } from "react";

const Principal = () => {
  const { loading, acceso, data } = useGet("http://localhost:3500/principal");
  const navigate = useNavigate();
  const [seleccion, setSeleccion] = useState(false)
  const [idSeleccionados, setIdSeleccionados] = useState([]);

  if (acceso === false && loading === false) {
    navigate("/login", { replace: true });
    return
  }

  const eliminarFilas = () => {
    setSeleccion(true)
  }

  const confirmarEliminar = () => {
    setSeleccion(false)  // muestra la columna de la seleccion.
    setIdSeleccionados([])
  }

  // Acciones con la tabla.

  const seleccionarFila = (id) => {
    if (idSeleccionados.includes(id)) return;
    setIdSeleccionados([...idSeleccionados, id])
  }

  const eliminarSeleccion = (id) => {
    if (idSeleccionados.length > 0) {
      const seleccionados = idSeleccionados.filter((idSeleccionado) => idSeleccionado !== id)
      setIdSeleccionados(seleccionados)
    }
  }
  
  return (
    <div className="principal flex-center">
      <h1 className="titulo">Lista de Productos</h1>
      {
        loading === true && <h2>Cargando...</h2>
      }
      {acceso == true && data != false && (
        <div className="principal-wrapper flex-center">
          {
            <Tabla mostrarSeleccion={seleccion} data={data} seleccionarFila={seleccionarFila} eliminarSeleccion={eliminarSeleccion} />
          }
        </div>
      )}
      <div className="opciones">
        <div className="control-informacion">
          <button className="mostrar-informacion">Atras</button>
          <button className="mostrar-informacion">Siguiente</button>
        </div>

        <div className="opciones-informacion" >
          <span className="icono anadir" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#353b3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </span>
          {
            seleccion &&
            <span className="icono aceptar" onClick={confirmarEliminar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#353b3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
          }
          {
            !seleccion &&
            <span className="icono eliminar" onClick={eliminarFilas} >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#353b3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default Principal;

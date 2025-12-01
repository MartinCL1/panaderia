import { useContext, useRef } from "react";
import { Contexto } from "../../Contexto";

const FilaTabla = ({ producto, seleccionarEliminarFila, eliminarSeleccion, seleccionarFila }) => {
  const referencia = useRef(null)
  const { productoSeleccionado, seleccion } = useContext(Contexto)

  const marcarFila = (e) => {
    seleccionarEliminarFila(producto.id)
    if (!e.target.checked) {
      eliminarSeleccion(producto.id)
      return
    }
  }

  return (
    <tr onClick={() => seleccionarFila(producto)} className={productoSeleccionado?.id === producto.id ? "seleccionado" : ""} ref={referencia} >
      {
        seleccion && <td>
          <input type="checkbox" onClick={marcarFila} />
        </td>
      }
      <td> {producto.nombre} </td>
      <td> {producto.existente} </td>
      <td> {producto.actual} </td>
      <td> {producto.vendido} </td>
      <td> Q. {producto.precio_unidad} </td>
    </tr>
  )
}

export default FilaTabla;
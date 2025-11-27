import { useContext, useRef } from "react";
import { Contexto } from "../../Contexto";

const FilaTabla = ({ producto, seleccionarEliminarFila, eliminarSeleccion, seleccionarFila }) => {
  const referencia = useRef(null)
  const { productoSeleccionado, seleccion } = useContext(Contexto)

  const marcarFila = (e) => {
    seleccionarEliminarFila(producto.id)
    console.log(producto)

    if (!e.target.checked) {
      eliminarSeleccion(producto.id)
      return
    }
  }

  return (
    <tr onClick={() => seleccionarFila(producto.id)} className={productoSeleccionado === producto.id ? "seleccionado" : ""} >
      {
        seleccion && <td>
          <input type="checkbox" ref={referencia} onClick={marcarFila} />
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
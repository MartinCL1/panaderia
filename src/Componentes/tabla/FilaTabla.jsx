import { useRef } from "react";

const FilaTabla = ({ mostrarSeleccion, producto, seleccionarEliminarFila, eliminarSeleccion, seleccionarFila, idSeleccionado }) => {
  const referencia = useRef(null)

  const marcarFila = (e) => {
    seleccionarEliminarFila(producto.id)

    if (!e.target.checked) {
      eliminarSeleccion(producto.id)
      return
    }
  }

  return (
    <tr onClick={() => seleccionarFila(producto.id)} className={idSeleccionado === producto.id ? "seleccionado" : ""} >
      {
        mostrarSeleccion && <td>
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
import { useRef } from "react";

const FilaTabla = ({ mostrarSeleccion, producto, seleccionarFila, eliminarSeleccion }) => {
  const referencia = useRef(null)

  const marcarFila = (e) => {
    if (e.target.checked) {
      eliminarSeleccion(producto.id)
      return
    }
    seleccionarFila(producto.id)
  }

  return (
    <tr>
      {
        mostrarSeleccion && <td>
          <input type="checkbox" ref={referencia} onClick={marcarFila}/>
        </td>
      }
      <td>
        <input type="text" name="nombre" value={producto.nombre} />
      </td>
      <td>
        <input type="text" name="existente" value={producto.existente} />
      </td>
      <td>
        <input type="text" name="actual" value={producto.actual} />
      </td>
      <td>
        <input type="text" name="vendido" value={producto.vendido} />
      </td>
      <td>
        <input type="text" name="precio_unidad" value={producto.precio_unidad} />
      </td>
    </tr>
  )
}

export default FilaTabla;
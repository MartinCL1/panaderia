import FilaTabla from "./FilaTabla";
import "./tabla.css";

const Tabla = ({
  mostrarSeleccion,
  productos,
  seleccionarEliminarFila,
  eliminarSeleccion,
  idSeleccionado,
  seleccionarFila,
}) => {
  return (
    <table>
      <thead>
        <tr>
          {mostrarSeleccion && <th></th>}
          <th>Producto</th>
          <th>Existencia</th>
          <th>De hoy</th>
          <th>Vendida</th>
          <th>P/ Unidad</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto, index) => (
          <FilaTabla
            key={index}
            eliminarSeleccion={eliminarSeleccion}
            producto={producto}
            mostrarSeleccion={mostrarSeleccion}
            seleccionarEliminarFila={seleccionarEliminarFila}
            idSeleccionado={idSeleccionado}
            seleccionarFila={seleccionarFila}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;

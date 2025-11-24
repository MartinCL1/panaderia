import FilaTabla from './FilaTabla';
import './tabla.css'

const Tabla = ({mostrarSeleccion, data, seleccionarFila, eliminarSeleccion}) => {

  return (
    <table>
      <thead>
        <tr>
          {
            mostrarSeleccion && <th></th>
          }
          <th>Producto</th>
          <th>Existencia</th>
          <th>De hoy</th>
          <th>Vendida</th>
          <th>P/ Unidad</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((producto, index) => (
            <FilaTabla key={index} eliminarSeleccion={eliminarSeleccion} producto={producto} mostrarSeleccion={mostrarSeleccion} seleccionarFila={seleccionarFila} />
          ))
        }
      </tbody>
    </table>
  );
};

export default Tabla;

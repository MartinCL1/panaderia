import { useContext } from "react";
import { Contexto } from "../../Contexto";
import FilaTabla from "./FilaTabla";
import "./tabla.css";

const Tabla = ({
  seleccionarEliminarFila,
  eliminarSeleccion,
  seleccionarFila,
}) => {

  const { productos, seleccion} = useContext(Contexto)

  return (
    <table>
      <thead>
        <tr>
          {seleccion && <th></th>}
          <th>Producto</th>
          <th>Existencia</th>
          <th>Disponible para hoy</th>
          <th>Vendida</th>
          <th>P/ Unidad</th>
        </tr>
      </thead>
      <tbody>
        {productos?.map((producto, index) => (
          <FilaTabla
            key={index}
            eliminarSeleccion={eliminarSeleccion}
            producto={producto}
            seleccionarEliminarFila={seleccionarEliminarFila}
            seleccionarFila={seleccionarFila}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;

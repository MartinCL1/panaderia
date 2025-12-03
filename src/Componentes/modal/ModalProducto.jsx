import { useState, useRef } from "react"
import { v4 as uuidv4 } from 'uuid'

const ModalProducto = ({ cerrarModal, funcionModal, productoSeleccionado }) => {
    const referenciaModal = useRef(null)
    const [producto, setProducto] = useState(productoSeleccionado || {
        id: uuidv4(),
        nombre: "",
        precio_unidad: "",
        existente: "",
        actual: "",
        vendido: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        const nombrePropiedad = e.target.name;
        let valorPropiedad = e.target.value
        if (nombrePropiedad !== "precio_unidad" && valorPropiedad.includes('.')) {
            return
        }
        if (nombrePropiedad !== "nombre") {
            e.target.value = isNaN(valorPropiedad) ? "" : valorPropiedad
        }
        setProducto({ ...producto, [e.target.name]: e.target.value })
    }

    return (
        <div className="anadir-modal flex-center" ref={referenciaModal}>
            <form className="modal-contenedor">
                <div className="wrapper-input">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" value={producto.nombre} required onChange={handleChange} />
                </div>
                <div className="wrapper-input">
                    <label htmlFor="precio">Precio</label>
                    <input type="number" pattern="^\d+(\.\d{2})$" id="precio" name="precio_unidad" value={producto.precio_unidad} required onChange={handleChange} />
                </div>
                <div className="wrapper-input">
                    <label htmlFor="existente">Existente</label>
                    <input type="number" pattern="^\d+$" id="existente" name="existente" value={producto.existente} required onChange={handleChange} />
                </div>
                <div className="wrapper-input">
                    <label htmlFor="actual">Actual</label>
                    <input type="number" pattern="^\d+$" id="actual" name="actual" value={producto.actual} required onChange={handleChange} />
                </div>
                <div className="wrapper-input">
                    <label htmlFor="vendido">Vendido</label>
                    <input type="number" pattern="^\d+$" id="vendido" name="vendido" value={producto.vendido} required onChange={handleChange} />
                </div>

                <div className="wrapper-botones">
                    <button className="cancelar" onClick={cerrarModal}>Cancelar</button>
                    <button className="aceptar" onClick={(e) => funcionModal(e, producto)}>Aceptar</button>
                </div>
            </form>
        </div>
    )
}

export default ModalProducto;
import { useState } from "react"
import usePost from "../../../hooks/usePost"
import {v4 as uuidv4} from 'uuid'
import { useContext } from "react"
import { Contexto } from "../../Contexto"

const Anadir = ({ cerrarModal, anadirProducto }) => {
    const { sendPostRequest } = usePost()
    const { productos, setProductos } = useContext(Contexto)

    const [producto, setProducto] = useState({
        id: uuidv4(),
        nombre: "",
        precio_unidad: "",
        existente: "",
        actual: "",
        vendido: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        setProducto({ ...producto, [e.target.name]: e.target.value })
    }
    
    const agregarProducto = async (e) => {
        e.preventDefault()
        productos.length > 0 ? setProductos([...productos, producto]) : setProductos([...[], producto])
        sendPostRequest('http://localhost:3500/principal/agregarProducto', producto);
        cerrarModal()
    }

    return (
        <div className="anadir-modal flex-center">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f8f8f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>

            <form className="modal-contenedor">
                <div className="wrapper-input">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" required onChange={handleChange} />
                </div>
                <div className="wrapper-input">
                    <label htmlFor="precio">Precio</label>
                    <input type="number" id="precio" name="precio_unidad" required onChange={handleChange} />
                </div>
                <div className="wrapper-input">
                    <label htmlFor="existente">Existente</label>
                    <input type="number" id="existente" name="existente" required onChange={handleChange} />
                </div>
                <div className="wrapper-input">
                    <label htmlFor="actual">Actual</label>
                    <input type="number" id="actual" name="actual" required onChange={handleChange} />
                </div>
                <div className="wrapper-input">
                    <label htmlFor="vendido">Vendido</label>
                    <input type="number" id="vendido" name="vendido" required onChange={handleChange} />
                </div>

                <div className="wrapper-botones">
                    <button className="cancelar" onClick={cerrarModal}>Cancelar</button>
                    <button className="aceptar" onClick={agregarProducto}>Aceptar</button>
                </div>
            </form>
        </div>
    )
}

export default Anadir;
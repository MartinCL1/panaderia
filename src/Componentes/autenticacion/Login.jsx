import { useEffect, useState } from "react";
import "./autenticacion.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";

const Login = () => {
  const { acceso, cargando } = useAuth("http://localhost:3500/login");
  const { datos, loading, sendPostRequest, error } = usePost();

  const tiempoLocal = new Date();
  const [saludo, setSaludo] = useState("");
  const [credenciales, setCredenciales] = useState({
    nombreUsuario: "",
    contrasena: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!acceso && !cargando) {
      const horas = tiempoLocal.getHours();
      if (horas >= 0 && horas < 12) {
        return setSaludo("Buenos dias");
      } else if (horas >= 12 && horas <= 18) {
        return setSaludo("Buenas tardes");
      } else return setSaludo("Buenas noches");
    }
    if (acceso && !cargando) return navigate("/home");

  }, [acceso, cargando]);

  const iniciarSesion = (e) => {
    e.preventDefault();
    sendPostRequest("http://localhost:3500/login", credenciales);
  };

  useEffect(() => {
    if (!error && !loading && datos) {
      navigate('/home', { replace: true })
    }
  }, [datos, loading, error])


  const cambiarEstado = (e) => {
    const propiedad = e.target.name;
    setCredenciales({ ...credenciales, [propiedad]: e.target.value });
  };

  return (
    <section className="login-wrapper flex-center">
      {!acceso && !cargando &&
        <div className="login">
          <div className="encabezado-login flex-center">
            <h1>{saludo}</h1>
            <span>Ingresa tus credenciales</span>
          </div>

          <div className="login-form flex-center">
            <div className="wrapper-informacion flex-center">
              <input
                type="text"
                placeholder="Nombre de usuario"
                name="nombreUsuario"
                onChange={cambiarEstado}
              />
              <input
                type="password"
                placeholder="contraseña"
                name="contrasena"
                onChange={cambiarEstado}
              />
            </div>

            <div className="botones flex-center">
              <Link className="aceptar" onClick={iniciarSesion}>
                Iniciar Sesion
              </Link>
            </div>
            <Link>Olvidaste tu contrasena?</Link>
          </div>
        </div>
      }
    </section>
  );
};

export default Login;

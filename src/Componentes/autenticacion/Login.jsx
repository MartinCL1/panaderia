import { useEffect, useState } from "react";
import "./autenticacion.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const tiempoLocal = new Date();
  const [saludo, setSaludo] = useState("");
  const [credenciales, setCredenciales] = useState({
    nombreUsuario: "",
    contrasena: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await fetch("http://localhost:3500/login", {
        credentials: "include",
      });
      const acceso = await data.json();
      if (acceso.acceso) return navigate("/home", {replace: true});
    })();

    const horas = tiempoLocal.getHours();

    if (horas >= 0 && horas < 12) {
      return setSaludo("Buenos dias");
    } else if (horas >= 12 && horas <= 18) {
      return setSaludo("Buenas tardes");
    } else return setSaludo("Buenas noches");
  }, []);

  const iniciarSesion = async (e) => {
    e.preventDefault();
    const data = await fetch("http://localhost:3500/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        nombreUsuario: credenciales.nombreUsuario,
        contrasena: credenciales.contrasena,
      }),
    });

    const acceso = await data.json();
    if (acceso.acceso) {
      navigate("/home");
    }
  };

  const cambiarEstado = (e) => {
    const propiedad = e.target.name;

    setCredenciales({ ...credenciales, [propiedad]: e.target.value });
    console.log(credenciales);
  };

  return (
    <section className="login-wrapper flex-center">
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
    </section>
  );
};

export default Login;

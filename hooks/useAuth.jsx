import { useEffect, useState } from "react";

const useAuth = (ruta) => {
  const [acceso, setAcceso] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const solicitudAcceso = await fetch(ruta, { credentials: "include" });
        const respuestaAcceso = await solicitudAcceso.json();
        setCargando(false);
        if(!respuestaAcceso.acceso) return setAcceso(false);
        setAcceso(respuestaAcceso.acceso)
      } catch {
        setCargando(false)
        setAcceso(false)
      }
    })();
  }, [ruta]);

  return { acceso, cargando };
};

export default useAuth;

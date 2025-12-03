import { useCallback, useEffect } from "react";
import { useState } from "react";

const useGet = (url) => {
  const [loading, setLoading] = useState(false);
  const [acceso, setAcceso] = useState(null);
  const [data, setData] = useState(null);

  const request = async (url) => {
    setLoading(true);

    try {
      const responseRequest = await fetch(url, {
        credentials: "include",
        method: "GET",
      });
      const responseStatus = await responseRequest.json(); // retorna el acceso.
      setLoading(false);
      if (!responseStatus.acceso) return setAcceso(false);
      setAcceso(true);
      setData(responseStatus.informacion); // informacion o producto.
      return;
    } catch {
      setLoading(false);
      setAcceso(false);
      return;
    }
  };

  const sendRequest = useCallback(request, [])

  useEffect(() => {
    request(url)
  }, [url])

  return { loading, acceso, data, sendRequest };
};

export default useGet;

import { useCallback, useState } from "react";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [datos, setDatos] = useState(false)

  const sendPostRequest = useCallback(async (url=null, credenciales=null) => {
    setLoading(true);
    if (!url) {
      setDatos(false)
      setLoading(false);
      return;
    }

    try {
      const responseRequest = await fetch(url, {
        credentials: "include",
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credenciales)
      });

      const responseStatus = await responseRequest.json()
      setLoading(false)
      setDatos(responseStatus.acceso)
      return
    } catch {
      setLoading(false)
      setError(true);
      return;
    }
  }, []);

  return {datos, error, loading, sendPostRequest };
};

export default usePost;

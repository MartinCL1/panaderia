import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Componentes/autenticacion/Login";
import Principal from "./Componentes/Main/Principal";
import Protected from "./Componentes/Protected/Protected";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login', {replace: true})
  }, [])

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />} >
          <Route path="/home" element={<Principal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

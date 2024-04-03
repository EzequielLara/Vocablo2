import { createContext, useState, useEffect } from "react";

export const Usuario = createContext();

function ContextUsuario({ children }) {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    if (datos === null || datos === undefined) {
      const storedData = localStorage.getItem("myContextData");

      if (storedData) {
        setDatos(JSON.parse(storedData));
      }
    }
  }, []);

  useEffect(() => {
    if (datos != null && datos != undefined) {
      localStorage.setItem("myContextData", JSON.stringify(datos));
    }
  }, [datos]);

  return (
    <Usuario.Provider value={{ datos, setDatos }}>{children}</Usuario.Provider>
  );
}

export default ContextUsuario;

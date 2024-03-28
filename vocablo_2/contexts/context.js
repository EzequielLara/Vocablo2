import { createContext, useState, useEffect } from "react";

export const Configuracion = createContext();

function Context({ children }) {
  const [datos, setDatos] = useState({
    tematica: {
      animales: [
        "",
        "león",
        "perro",
        "gato",
        "oso",
        "rana",
        "elefante",
        "zorro",
        "jirafa",
        "conejo",
      ],
      vehiculos: [
        "",
        "coche",
        "barco",
        "moto",
        "avión",
        "camión",
        "tractor",
        "autobús",
        "helicóptero",
        "tren",
      ],
      alimentos: [
        "",
        "pera",
        "plátano",
        "manzana",
        "naranja",
        "fresa",
        "piña",
        "zanahoria",
        "lechuga",
        "pimiento",
      ],
      imagenes: [
        [
          "",
          "/animales/leon.png",
          "/animales/perro.png",
          "/animales/gato.png",
          "/animales/oso.png",
          "/animales/rana.png",
          "/animales/elefante.png",
          "/animales/zorro.png",
          "/animales/jirafa.png",
          "/animales/conejo.png",
        ],
        [
          "",
          "/vehiculos/coche.jpg",
          "/vehiculos/barco.png",
          "/vehiculos/moto.png",
          "/vehiculos/avion.png",
          "/vehiculos/camion.png",
          "/vehiculos/tractor.jpg",
          "/vehiculos/autobus.png",
          "/vehiculos/helicoptero.png",
          "/vehiculos/tren.png",
        ],
        [
          "",
          "/alimentos/pera.png",
          "/alimentos/platano.png",
          "/alimentos/manzana.png",
          "/alimentos/naranja.png",
          "/alimentos/fresa.png",
          "/alimentos/pinia.png",
          "/alimentos/zanahoria.png",
          "/alimentos/lechuga.png",
          "/alimentos/pimiento.png",
        ],
      ],
    },
    tiempo: 0,
    imagen: false,
    sonido: false,
    mayusculas: false,
    numeroTarjetas: 5,
    tiempo: 0,
  });
  useEffect(() => {
    if (datos === null || datos === undefined) {
      const storedData = localStorage.getItem("myContextDataPalabras");

      if (storedData) {
        setDatos(JSON.parse(storedData));
      }
    }
  }, []);

  useEffect(() => {
    if (datos != null && datos != undefined) {
      localStorage.setItem("myContextDataPalabras", JSON.stringify(datos));
    }
  }, [datos]);

  return (
    <Configuracion.Provider value={{ datos, setDatos }}>
      {children}
    </Configuracion.Provider>
  );
}

export default Context;

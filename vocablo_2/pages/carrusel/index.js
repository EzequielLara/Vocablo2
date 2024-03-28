import Layout from "../../componentes/layouts/Layout";
import Link from "next/link";
import Header from "../../componentes/compartidos/Header";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";

import { Configuracion } from "../../contexts/context";
import { useContext } from "react";

const ConfiguracionDomain = () => {
  const { datos, setDatos } = useContext(Configuracion);

  const [imagen, setImagen] = useState(false);
  const [sonido, setSonido] = useState(false);
  const [mayusculas, setMayusculas] = useState(false);
  const [numeroTarjetas, setNumeroTarjetas] = useState(5);
  const [tiempo, setTiempo] = useState(4);
  const [tema, setTema] = useState("animales");

  useEffect(() => {
    setDatos({
      ...datos,
      tema,
      imagen,
      sonido,
      mayusculas,
      numeroTarjetas,
      tiempo,
    });
  }, [imagen, sonido, mayusculas, numeroTarjetas, tiempo, tema]);

  return (
    <>
      <Layout title="Configuración">
        <div className="imgvocablo">
          <Link href={"/"}>
            <a>
              <img alt="Logo vocablo" src="/logo_vocablo_700.png" width="200" />
            </a>
          </Link>
        </div>
        <main>
          <Header contenido="Configuración"></Header>
          <form className={styles.card2}>
            <div className="form-row pb-3 ">
              <select
                className="form-select mb-1"
                aria-label="Default select example"
                onChange={(e) => {
                  setTema(e.target.value);
                }}
              >
                <option defaultValue="animales">Temática</option>
                <option value="animales">Animáles</option>
                <option value="vehiculos">Vehículos</option>
                <option value="alimentos">Alimentos</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  defaultValue
                  id="invalidCheck1"
                  onChange={() => setImagen(!imagen)}
                />
                <label className="form-check-label" htmlFor="invalidCheck1">
                  Imagen
                </label>
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  defaultValue
                  id="invalidCheck2"
                  onChange={() => setSonido(!sonido)}
                />
                <label className="form-check-label" htmlFor="invalidCheck2">
                  Sonido
                </label>
              </div>
            </div>
            <div className="form-group mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  defaultValue
                  id="invalidCheck3"
                  onChange={() => {
                    setMayusculas(!mayusculas);
                  }}
                />
                <label className="form-check-label" htmlFor="invalidCheck3">
                  Mayúsculas
                </label>
              </div>
            </div>
            <Link href={"carrusel/app/"}>
              <button className="btn btn-primary mt-4 w-100" type="submit">
                Aceptar
              </button>
            </Link>
          </form>
        </main>
      </Layout>
      <style>{`
       @media (max-width:440px){
            .imgvocablo{
              width:100%;
              text-align:center;
              margin-top:15px;
            }
          }
    `}</style>
    </>
  );
};

export default ConfiguracionDomain;

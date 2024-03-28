import { useState } from "react";
import Link from "next/link";
import Layout from "../../../../componentes/layouts/Layout";

import Personajes from "../../../../componentes/Personajes";
import Navegacion from "../../../../componentes/navegacion/Navegacion";
import ModalAvatar from "../../../../componentes/modales/ModalAvatar";
import LayoutMainContent from "../../../../componentes/layouts/LayoutMainContent";

const Avatares = () => {
  const [seleccion, setSeleccion] = useState("");

  const getPerro = (perro) => {
    setSeleccion(perro);
  };

  return (
    <>
      <>
        <div className="imgvocablo">
          <div className="imgvocablo">
            <Link href={"/"}>
              <a>
                <img
                  alt="Logo vocablo"
                  src="/logo_vocablo_700.png"
                  width="200"
                />
              </a>
            </Link>
          </div>
        </div>
        <Layout title="app-doman">
          <main>
            {seleccion ? (
              <ModalAvatar
                seleccion={seleccion}
                setSeleccion={setSeleccion}
              ></ModalAvatar>
            ) : null}
            <Personajes getPerro={getPerro}></Personajes>
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
    </>
    // <>
    //   <LayoutMainContent title="doman | app-1" content="método doman">
    //     <Navegacion usuario={"prueba"}></Navegacion>
    //
    //   </LayoutMainContent>
    // </>
  );
};

export default Avatares;

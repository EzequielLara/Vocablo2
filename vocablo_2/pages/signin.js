import Formulario from "../componentes/Formulario";
import Eslogan from "../componentes/Eslogan";
import LayoutMainContent from "../componentes/layouts/LayoutMainContent";
import { useEffect, useState } from "react";

import { getProviders } from "next-auth/react";
import { getSession } from "next-auth/react";
import { verify } from "jsonwebtoken";

const Signin = ({ usuario, loginAuth }) => {
  const [providers, setProviders] = useState(null);
  const peticionProviders = async () => {
    const datos = await getProviders();
    setProviders(datos);
  };

  useEffect(() => {
    peticionProviders();
  }, []);

  return (
    <>
      <LayoutMainContent title="login" content="vocablo">
        <div className="container">
          <div className="row">
            <div className="m-auto col-sm col-xl-4 col-lg bg-transparent ">
              <div className="formulario">
                <Formulario providers={providers} />
              </div>
            </div>
            <div className="m-auto col-sm col-xl-7 bg-transparent">
              <div className="eslogan">
                <Eslogan />
              </div>
            </div>
          </div>
        </div>
      </LayoutMainContent>
      <style>{`
       
        .formulario{
          max-width:350px;
          min-width:300px;
          margin:auto;
          margin-top:5%;
        }
        .eslogan{
          margin:auto;
        }
        @media (max-width:400px){
          .formulario{
            width:300px;
            margin-top:15%;
          }
          .eslogan{
            width:300px;
            margin-top:15%;
            margin-bottom:35px;
            text-aling:justify;
          }
        }
        @media (max-width:580px){
          .formulario{
            width:300px;
            margin-top:15%;
          }
          .eslogan{
            width:300px;
            margin-top:15%;
            margin-bottom:35px;
          }
        }
    `}</style>
    </>
  );
};

// export const getStaticProps = async () => {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// };
// Al desplegar la aplicación no deja que los provider se obtengan desde el servidor asi que se hace desde el front

export const getServerSideProps = async (context) => {
  const usuario = await getSession(context);
  let myTokenName = context.req.cookies.myTokenName;
  if (!usuario) {
    if (myTokenName !== undefined) {
      try {
        verify(myTokenName, process.env.SECRET_JWT);
        return {
          redirect: {
            destination: "/docentes",
            permanent: false,
          },
        };
      } catch {
        myTokenName = undefined;
        return {
          props: {
            usuario: null,
            loginAuth: false,
          },
        };
      }
    }
    return {
      props: {
        usuario: null,
        loginAuth: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/docentes",
      permanent: false,
    },
  };
};

export default Signin;

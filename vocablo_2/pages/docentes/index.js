import Layout from "../../componentes/layouts/Layout";
import { useEffect, useState } from "react";
import Navegacion from "../../componentes/navegacion/Navegacion";
import ModalRecurso from "../../componentes/modales/ModalRecurso";
import { getSession } from "next-auth/react";
import { verify } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import axios from "axios";

import { Usuario } from "../../contexts/contextUsuario";
import { useContext } from "react";

const Home = ({ username, email, loginAuth }) => {
  const { datos, setDatos } = useContext(Usuario);
  console.log(username, email, loginAuth);

  const comprobacion = async () => {
    if (loginAuth) {
      await axios
        .post("/api/auth/register", {
          username: username,
          email: email,
          loginAuth: loginAuth,
        })
        .catch((e) => console.log(e.response.data.error));
    } else {
      return;
    }
  };

  useEffect(() => {
    setDatos({
      username: username,
      email: email,
      loginAuth: loginAuth,
    });
  }, []);

  useEffect(() => {
    const fetchDatos = async () => {
      const response = await fetch("/api/metodologias");
      const data = await response.json();
      setMetodologias(data);
    };
    fetchDatos();
  }, [email, loginAuth, setDatos, username]);

  useEffect(() => {
    comprobacion();
  }, []);

  const [recursoSeleccionado, setRecursoSeleccionado] = useState("");
  const [modal, setModal] = useState(false);
  const [seleccion, setSeleccion] = useState({});
  const { recursos, recursosColectivos } = seleccion;
  const [metodologias, setMetodologias] = useState();

  const cambiarModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Layout title="docentes | recursos">
        <Navegacion usuario={username} loginAuth={loginAuth}></Navegacion>
        <main>
          {!modal ? (
            <>
              <h3 className="m-3 title mb-5">Recursos Didácticos</h3>
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  {metodologias &&
                    metodologias.length > 0 &&
                    metodologias.map((met, index) => (
                      <div key={index} className=" m-auto text-center">
                        <button
                          type="button"
                          className="p-3 my-2 m-auto btn btn-outline-secondary w-75"
                          onClick={() => {
                            setSeleccion(met);
                          }}
                        >
                          <h5 className="ms-3">
                            Metodología {met.metodologia}
                          </h5>
                        </button>
                      </div>
                    ))}
                </div>
                <div className="col">
                  {seleccion && seleccion.metodologia !== undefined ? (
                    <>
                      <h4 className="title text-capitalize m-auto w-75 mt-2">
                        {seleccion.metodologia}
                      </h4>
                      <hr className="w-50 m-auto my-2"></hr>

                      <div className="w-50 m-auto text-center">
                        <h5 className="mt-3">Recursos:</h5>
                        {recursos !== undefined &&
                          recursos.length > 0 &&
                          recursos.map((sel, index) => (
                            <button
                              key={index}
                              className="p-2 text-capitalize list-group-item list-group-item-action list-group-item-primary text-center"
                              value={sel}
                              onClick={(e) => {
                                setRecursoSeleccionado(e.target.value);
                                setModal(!modal);
                              }}
                            >
                              {sel}
                            </button>
                          ))}
                      </div>

                      <div className="w-50 m-auto text-center pb-5">
                        <h5 className="mt-2">Recursos Grupales:</h5>
                        {recursosColectivos !== undefined &&
                          recursosColectivos.length > 0 &&
                          recursosColectivos.map((sel, index) => (
                            <button
                              key={index}
                              className="p-2 text-capitalize list-group-item list-group-item-action list-group-item-warning text-center"
                              value={sel}
                              onClick={(e) => {
                                setRecursoSeleccionado(
                                  e.target.value + " " + "grupal"
                                );
                                setModal(!modal);
                              }}
                            >
                              {sel}
                            </button>
                          ))}
                      </div>
                    </>
                  ) : (
                    <h4 className="title my-5 m-auto text-center w-75">
                      Seleccione una Metodología
                    </h4>
                  )}
                </div>
              </div>
            </>
          ) : (
            <ModalRecurso
              cambiarModal={cambiarModal}
              recursoSeleccionado={recursoSeleccionado}
            ></ModalRecurso>
          )}
        </main>
      </Layout>
      <style>{`
           .title{
            margin-bottom:60px;
            color:#247c8c;
            text-align:center;
            }
          @media (max-width:440px){
            .title{
              width:100%;
              text-align:center;
              margin-top:0px;
            }  
      `}</style>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const usuario = await getSession(context);
  const myTokenName = context.req.cookies.myTokenName;
  if (!usuario) {
    try {
      verify(myTokenName, process.env.SECRET_JWT);
      return {
        props: {
          username: jwt.decode(myTokenName).username,
          email: jwt.decode(myTokenName).email,
          loginAuth: false,
        },
      };
    } catch {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }
  }
  return {
    props: {
      username: usuario.user.name,
      email: usuario.user.email,
      loginAuth: true,
    },
  };
};

export default Home;

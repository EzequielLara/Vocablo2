import Layout from "../../componentes/layouts/Layout";
import Navegacion from "../../componentes/navegacion/Navegacion";
import ListadoCursos from "../../componentes/ListadoCursos";
import ModalCurso from "../../componentes/modales/ModalCurso";

import { useContext, useEffect, useState } from "react";
import { Usuario } from "../../contexts/contextUsuario";
import { useRouter } from "next/router";

const Grupos = () => {
  const { datos, setDatos } = useContext(Usuario);
  const [modal, setModal] = useState(true);
  const [animarModal, setAnimarModal] = useState(true);
  const [cursos, setCursos] = useState([]);
  const [cursoEditar, setCursoEditar] = useState({});
  const [cambios, setCambios] = useState(false)

  const nuevoCurso = (curso) => {
    setCursoEditar(curso);
    setModal(!modal);
    setCambios(true);
  };

  const cambiarModal = () => {
    setModal(!modal);
  };
  const cambiarAnimarModal = () => {
    setAnimarModal(!modal);
  };

  return (
    <>
      {datos && (
        <Layout title="docentes | cursos">
          <Navegacion
            usuario={datos.username}
            loginAuth={datos.loginAuth}
          ></Navegacion>
          <main>{modal ? (
            <>
              <ListadoCursos cambios={cambios} setCambios={setCambios} nuevoCurso={nuevoCurso}></ListadoCursos>
            </>
          ) : (
            <ModalCurso
              cambiarModal={cambiarModal}
              animarModal={animarModal}
              setAnimarModal={cambiarAnimarModal}
              cursos={cursos}
              cursoEditar={cursoEditar}
              setCursoEditar={setCursoEditar}
              setCursos={setCursos}
            ></ModalCurso>
          )}
          </main>
        </Layout>
      )}
    </>
  );
};

export default Grupos;

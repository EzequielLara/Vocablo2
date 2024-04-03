import { useState } from "react";
import Listado from "../../componentes/Listado";
import ListadoCursos from "../../componentes/ListadoCursos";
import Layout from "../../componentes/layouts/Layout";
import ModalAlumno from "../../componentes/modales/ModalAlumno";
import Navegacion from "../../componentes/navegacion/Navegacion";

import { useContext, useEffect } from "react";
import { Usuario } from "../../contexts/contextUsuario";
import { useRouter } from "next/router";
import Link from "next/link";

const Alumnos = () => {
  const { datos, setDatos } = useContext(Usuario);
  const router = useRouter();

  const [modal, setModal] = useState(true);
  const [animarModal, setAnimarModal] = useState(true);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoEditar, setAlumnoEditar] = useState({});
  const [cambios, setCambios] = useState(false);

  const nuevoAlumno = (alumno) => {
    setAlumnoEditar(alumno);
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
        <Layout title="docente | alumnos">
          <Navegacion
            usuario={datos.username}
            loginAuth={datos.loginAuth}
          ></Navegacion>
          <main>
            {modal ? (
              <>
                <Listado cambios={cambios} setCambios={setCambios} nuevoAlumno={nuevoAlumno}></Listado>
              </>
            ) : (
              <ModalAlumno
                cambiarModal={cambiarModal}
                animarModal={animarModal}
                setAnimarModal={cambiarAnimarModal}
                alumnos={datos.alumnos}
                alumnoEditar={alumnoEditar}
                setAlumnoEditar={setAlumnoEditar}
                setAlumnos={setAlumnos}
              ></ModalAlumno>
            )}
          </main>
        </Layout>
      )}
    </>
  );
};

export default Alumnos;

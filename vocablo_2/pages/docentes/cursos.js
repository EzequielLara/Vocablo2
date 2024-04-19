import Layout from "../../componentes/layouts/Layout";
import Navegacion from "../../componentes/navegacion/Navegacion";
import ListadoCursos from "../../componentes/ListadoCursos";
import ModalCurso from "../../componentes/modales/ModalCurso";

import { useContext, useEffect, useState } from "react";
import { Usuario } from "../../contexts/contextUsuario";
import Swal from "sweetalert2";

const Grupos = () => {
  const { datos, setDatos } = useContext(Usuario);
  const [modal, setModal] = useState(true);
  const [animarModal, setAnimarModal] = useState(true);
  const [cursos, setCursos] = useState([]);
  const [cursoEditar, setCursoEditar] = useState({});
  const [cambios, setCambios] = useState(false)


  const nuevoCurso = (curso) => {
    if (!curso.nombreCurso) {
      setCursoEditar(curso);
      setModal(!modal);
      setCambios(true);
    } else {
      Swal.fire({
        text: `¿Desea modificar el curso?.Recuerde que puede haber alumnos asociados a ellos y que deberán ser reasignados posteriormente en la pestaña "alumnos"`,
        icon: "info",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setCursoEditar(curso);
          setModal(!modal);
          setCambios(true);

        } else if (result.isDenied) {
          Swal.fire({
            text: "Opción de modificar el curso descartada",
            icon: "error",
          });
        }
      });
    }

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

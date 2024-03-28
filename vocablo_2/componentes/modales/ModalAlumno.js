import style from "../../styles/ModalAlumnos.module.css";
import { useState, useEffect, useContext } from "react";
import { Usuario } from "../../contexts/contextUsuario";
import { generarFecha } from "../../shared/generarFecha";
import { generarId } from "../../shared/generarId";
import axios from "axios";

const ModalAlumno = ({
  cambiarModal,
  animarModal,
  setAnimarModal,
  alumnos,
  setAlumnos,
  alumnoEditar,
  setAlumnoEditar,
}) => {
  const { datos, setDatos } = useContext(Usuario);
  const [nombreAlumno, setNombreAlumno] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [apellidosAlumno, setApellidosAlumno] = useState("");
  const [cursoAlumno, setCursoAlumno] = useState("");
  const [grupoAlumno, setGrupoAlumno] = useState("");
  const [id, setId] = useState("");
  const [cursos, setCursos] = useState([]);
  const [grupos, setGrupos] = useState([]);

  const [error, setError] = useState(false);
  useEffect(() => {
    const nombreCursos = [];
    datos.cursos.map((curso) => {
      nombreCursos.push(curso.nombreCurso);
    });
    setCursos(nombreCursos);
  }, []);

  useEffect(() => {
    console.log("alumnoEditar: ", alumnoEditar);
    if (Object.keys(alumnoEditar).length > 0) {
      setNombreAlumno(alumnoEditar.nombre);
      setFechaCreacion(alumnoEditar.fecha_creacion);
      setApellidosAlumno(alumnoEditar.apellidos);
      setCursoAlumno(alumnoEditar.curso);
      setGrupoAlumno(alumnoEditar.grupo);
      setId(alumnoEditar.id);
    }
  }, []);

  const listadoGrupos = (curso) => {
    const listado = datos.cursos.filter((cur) => cur.nombreCurso === curso);
    if (listado[0] && listado[0].grupos) {
      setGrupos(listado[0].grupos);
    }
  };

  const ocultarModal = () => {
    setTimeout(() => {
      setAnimarModal();
      setAlumnoEditar({});
      cambiarModal();
    }, 400);
  };

  const guardarAlumno = async () => {
    const usuario = datos;
    if (alumnoEditar.id) {
      const alumnoNuevo = {
        id: alumnoEditar.id,
        fecha_creacion: fechaCreacion,
        fecha_modificacion: generarFecha(),
        nombreAlumno,
        apellidosAlumno,
        cursoAlumno,
        grupoAlumno,
      };
      console.log("ALUMNO NUEVO: ", alumnoEditar);
      //Actualizar
      const alumnosActualizados = alumnos.map((alumnoState) =>
        alumnoState.id == alumnoEditar.id ? alumnoNuevo : alumnoState
      );
      setAlumnos(alumnosActualizados);
      setAlumnoEditar({});
      await axios
        .put("/api/alumnos", { alumnoNuevo, usuario })
        .catch((e) => console.log(e.response.data.error));
      return;
    }
    //Nuevo
    const nuevo = {
      id: generarId(),
      fecha_creacion: generarFecha(),
      nombre: nombreAlumno,
      apellidos: apellidosAlumno,
      curso: cursoAlumno,
      grupo: grupoAlumno,
    };

    await axios
      .post("/api/alumnos", { nuevo, usuario })
      .catch((e) => console.log(e.response.data.error));
  };

  const resetearFormularioModal = () => {
    setNombreAlumno("");
    setApellidosAlumno("");
    setCursoAlumno("");
    setGrupoAlumno("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nombreAlumno.trim() == "" ||
      apellidosAlumno.trim() == "" ||
      cursoAlumno.trim() == "" ||
      grupoAlumno.trim() == ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    guardarAlumno();
    resetearFormularioModal();
    ocultarModal();
  };
  return (
    <>
      <div className={style.modal}>
        <div className={style.cerrar_modal}>
          <img src="/cerrar.svg" alt="cerrar modal" onClick={ocultarModal} />
        </div>
        <form
          onSubmit={handleSubmit}
          className={`${style.formulario} ${
            animarModal ? style.animar : style.cerrar
          }`}
        >
          <legend>
            {alumnoEditar.nombre ? "Editar Alumno" : "Nuevo Alumno"}
          </legend>
          <div className="text-center mb-3">
            <label className="w-25" htmlFor="nombre">
              Nombre:
            </label>
            <input
              className="w-50 p-2 estiloInput"
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Nombre del Alumno"
              value={nombreAlumno}
              onChange={(e) => {
                setNombreAlumno(e.target.value);
              }}
            />
          </div>
          <div className="text-center mb-3">
            <label className="w-25" htmlFor="apellidosAlumno">
              Apellidos:
            </label>
            <input
              className="w-50 p-2 estiloInput"
              id="apellidosAlumno"
              name="apellidosAlumno"
              type="text"
              placeholder="Apellidos del Alumno"
              value={apellidosAlumno}
              onChange={(e) => {
                setApellidosAlumno(e.target.value);
              }}
            />
          </div>
          <div className="text-center ">
            <div className="mb-3">
              <label className="w-25" htmlFor="cursoAlumno">
                Curso:
              </label>
              <select
                className="w-50 p-2 estiloSelect"
                id="cursoAlumno"
                value={cursoAlumno}
                onChange={(e) => {
                  setCursoAlumno(e.target.value);
                  listadoGrupos(e.target.value);
                }}
              >
                <option value="">Curso</option>
                {cursos.map((curso, index) => (
                  <option key={index} value={curso}>
                    {curso}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="w-25" htmlFor="grupoAlumno">
                Grupo:
              </label>
              <select
                className="w-50 p-2 estiloSelect"
                id="grupoAlumno"
                value={grupoAlumno}
                onChange={(e) => {
                  setGrupoAlumno(e.target.value);
                }}
              >
                <option value="">Grupo</option>
                {grupos.map((grup, index) => (
                  <option key={index} value={grup}>
                    {grup}
                  </option>
                ))}
              </select>
            </div>

            {error && <h5 className="uno">*No se admiten campos vacíos</h5>}
            <input
              id="boton"
              name="boton"
              type="submit"
              value={alumnoEditar.nombre ? "Modificar Alumno" : "Añadir Alumno"}
            />
          </div>
        </form>
      </div>
      <style>{`
          .uno{
            color:tomato;
          }
          .estiloInput{
            background-color:transparent;
            border: 2px solid white;
            color:white;
            font-size:1.2rem;
          }
          .estiloSelect{
            border-radius: 10px;
            border: 2px solid white;
            color:black;
            font-size:1.2rem;
            text-align:center;
          }
      `}</style>
    </>
  );
};
export default ModalAlumno;

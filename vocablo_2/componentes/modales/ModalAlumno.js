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
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false);
  useEffect(() => {
    const nombreCursos = [];
    datos.cursos.map((curso) => {
      nombreCursos.push(curso.nombreCurso);
    });
    setCursos(nombreCursos);
  }, []);

  useEffect(() => {
    if (Object.keys(alumnoEditar).length > 0) {
      setNombreAlumno(alumnoEditar.nombre);
      setFechaCreacion(alumnoEditar.fecha_creacion);
      setApellidosAlumno(alumnoEditar.apellidos);
      setCursoAlumno(alumnoEditar.curso);
      setGrupoAlumno(alumnoEditar.grupo);
      setId(alumnoEditar.id);
      setEmail(alumnoEditar.email);
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
        email: email,
        nombre: nombreAlumno,
        apellidos: apellidosAlumno,
        curso: cursoAlumno,
        grupo: grupoAlumno,

      };

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
      perfil: "alumno",
      id: generarId(),
      password: '12345',
      fecha_creacion: generarFecha(),
      fecha_modificacion: generarFecha(),
      email: email,
      nombre: nombreAlumno,
      apellidos: apellidosAlumno,
      curso: cursoAlumno,
      grupo: grupoAlumno,
      activado: true
    };

    await axios
      .post("/api/alumnos", { nuevo, usuario })
      .catch((e) => console.log(e.response));
  };

  const resetearFormularioModal = () => {
    setNombreAlumno("");
    setApellidosAlumno("");
    setCursoAlumno("");
    setGrupoAlumno("");
    setEmail("");
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
          className={`${style.formulario} ${animarModal ? style.animar : style.cerrar
            }`}
        >
          <legend>
            {alumnoEditar.nombre ? "Editar Alumno" : "Nuevo Alumno"}
          </legend>
          <div className="text-center mb-3">
            <label className="w-25" htmlFor="nombre">
              *Nombre:
            </label>
            <input
              className="w-50 p-2 estiloInput"
              autoComplete="off"
              name="nombre"
              id="nombre"
              type="text"
              placeholder="Nombre"
              value={nombreAlumno}
              onChange={(e) => {
                const formatearNombre = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLocaleLowerCase();
                setNombreAlumno(formatearNombre);
              }}
            />
          </div>
          <div className="text-center mb-3">
            <label className="w-25" htmlFor="email">
              email:
            </label>
            <input
              className="w-50 p-2 estiloInput"
              autoComplete="off"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                const valueEmail = e.target.value.toLowerCase()
                setEmail(valueEmail);
              }}
            />
          </div>
          <div className="text-center mb-3">
            <label className="w-25" htmlFor="apellidosAlumno">
              *Apellidos:
            </label>
            <input
              className="w-50 p-2 estiloInput"
              autoComplete="off"
              name="apellidosAlumno"
              id="apellidosAlumno"
              type="text"
              placeholder="Apellidos"
              value={apellidosAlumno}
              onChange={(e) => {
                const formatearApellidos = e.target.value.toLowerCase()
                setApellidosAlumno(formatearApellidos);
              }}
            />
          </div>
          <div className="text-center ">
            <div className="mb-3">
              <label className="w-25" htmlFor="cursoAlumno">
                *Curso:
              </label>
              <select
                className="w-50 p-2 estiloSelect"
                autoComplete="off"
                id="cursoAlumno"
                name="cursoAlumno"
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
                *Grupo:
              </label>
              <select
                name="grupoAlumno"
                id="grupoAlumno"
                className="w-50 p-2 estiloSelect"
                autoComplete="off"
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

            {error && <h5 className="uno">No se admiten campos vacíos excepto email</h5>}
            <input
              className="mb-5"
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

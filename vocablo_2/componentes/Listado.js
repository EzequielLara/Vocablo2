import { useEffect, useState } from "react";
import SearchBox from "./compartidos/SearchBox";
import SearchBoxCurso from "./compartidos/SearchBoxCurso";
import Spinner from "../componentes/compartidos/Spinner";
import { Suspense } from "react";
import { Usuario } from "../contexts/contextUsuario";
import { useContext } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { generarFecha } from "../shared/generarFecha";

const MySwal = withReactContent(Swal);

const Listado = ({ nuevoAlumno, cambios, setCambios }) => {
  const { datos, setDatos } = useContext(Usuario);

  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [paginaActual, setPaginaActual] = useState(1);
  const [numElementosPorPagina, setNumElementosPorPagina] = useState(5);
  const [numTotalPaginas, setNumTotalPaginas] = useState(null);

  const [datosPaginados, setDatosPaginados] = useState([]);
  const [seleccionBuscador, setSeleccionBuscador] = useState(null);

  const [alumnosFiltradosCursoGrupo, setAlumnosFiltradosCursoGrupo] = useState('');
  const [filtrarPorNombre, setFiltrarPorNombre] = useState(false)
  useEffect(() => {
    setLoading(true);

  }, []);
  useEffect(() => {
    console.log('alumnos filtrados por curso y grupo: ', alumnosFiltradosCursoGrupo)
    if (alumnosFiltradosCursoGrupo && alumnosFiltradosCursoGrupo.length > 0) {
      setDatosPaginados(alumnosFiltradosCursoGrupo)
    } else {
      setDatosPaginados(alumnos)
    }
  }, [alumnosFiltradosCursoGrupo, setAlumnosFiltradosCursoGrupo]);


  useEffect(() => {
    if (cambios) {

      fetchDatos();
    }
  }, [cambios]);

  useEffect(() => {
    if (datos.alumnos) {

      setDatos(datos);
      setAlumnos(datos.alumnos);

      const totalPaginas = Math.ceil(
        datos.alumnos.length / numElementosPorPagina
      );
      setNumTotalPaginas(totalPaginas);
      setLoading(false);
    } else {

      fetchDatos();
    }
  }, []);

  useEffect(() => {
    const inicio = (paginaActual - 1) * numElementosPorPagina;
    const fin = inicio + numElementosPorPagina;
    const datosPaginados = alumnos.slice(inicio, fin);
    setDatosPaginados(datosPaginados);
  }, [paginaActual, numElementosPorPagina, alumnos]);

  const setSeleccion = (e) => {
    setSeleccionBuscador(e);
  };
  const cambiarPrimeraPagina = () => {
    setPaginaActual(1);
  };

  const fetchDatos = async () => {
    const response = await fetch(`/api/alumnos?email=${datos.email}`, {
      method: "GET",
    });
    const data = await response.json();
    setDatos(data);
    setAlumnos(data.alumnos);
    const totalPaginas = Math.ceil(
      data.alumnos.length / numElementosPorPagina
    );
    setNumTotalPaginas(totalPaginas);
    setLoading(false);

  };

  const cambiarPagina = (direccion) => {
    if (direccion === "siguiente") {
      setPaginaActual(paginaActual + 1);
    } else {
      setPaginaActual(paginaActual - 1);
    }
  };

  const eliminarAlumno = (alumnoid) => {
    const fetchEliminarAlumno = async () => {
      try {
        const response = await fetch(
          `/api/alumnos?usuarioEmail=${datos.email}&alumnoId=${alumnoid}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          await response.json();
          // Actualizar el estado local de los alumnos
          const updatedAlumnos = alumnos.filter(
            (alumno) => alumno.id !== alumnoid
          );
          setAlumnos(updatedAlumnos);
          setSeleccionBuscador(null)
          setCambios(true);
          fetchDatos()


        } else {
          console.error(
            "Error al realizar la solicitud de borrado:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error al realizar la solicitud de borrado:", error);
      }
    };
    Swal.fire({
      text: "¿Desea eliminar al alumno?",
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
        fetchEliminarAlumno();
        Swal.fire({
          text: "Alumno eliminado",
          icon: "success",
        });

      } else if (result.isDenied) {
        Swal.fire({
          text: "Opción de eliminar alumno descartada",
          icon: "error",
        });
      }
    });
  };
  const encontrarCoincidenciaCursoGrupo = (alumnoCurso, alumnoGrupo) => {

    let cursoEncontrado = datos.cursos.find(cur => cur.nombreCurso == alumnoCurso);

    if (cursoEncontrado == undefined) {
      return false
    } else {
      if (cursoEncontrado.grupos.includes(alumnoGrupo)) {

        return true
      }
      return false
    }

  }

  return (
    <>
      {loading ? (
        <div className="m-5">
          <Suspense fallback={<div>Cargando...</div>}>
            <Spinner />
          </Suspense>
        </div>
      ) : datos.cursos == undefined && datos.alumnos == undefined || datos.cursos.length === 0 ? (
        <div
          className="alert alert-warning text-center w-75 m-auto mt-5"
          role="alert"
        >

          <p>
            Antes de crear un listado de alumnos debes crear al menos un curso y
            grupo
          </p>

          <Link href={"/docentes/cursos"}>
            <a>Crear Curso</a>
          </Link>
        </div>
      ) : (
        <div className="container w-auto mt-5">
          <div className="row justify-content-center align-items-center ">
            <div className="col-3 ">
              <h4 className="colorTexto">Alumnos {alumnos.length > 0 ? alumnos.length : ''}</h4>
            </div>
            <div className="col-1 text-start">
              <span
                className="material-icons colorIcono"
                data-toggle="tooltip"
                data-placement="top"
                title="Crear alumno nuevo"
                onClick={() => {
                  nuevoAlumno({});
                }}
              >
                person_add
              </span>
            </div>
            <div className="col-3 ps-5 form-check">
              <input className="form-check-input" type="checkbox" value={filtrarPorNombre} id="flexCheckDefault" onChange={() => setFiltrarPorNombre(!filtrarPorNombre)} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Filtrar por nombre
              </label>
            </div>
            <div className="col-5 text-end">
              {!filtrarPorNombre ? (
                <SearchBoxCurso
                  datos={datos}
                  setAlumnosFiltradosCursoGrupo={setAlumnosFiltradosCursoGrupo}>
                </SearchBoxCurso>
              ) : (
                <SearchBox
                  suggestions={alumnos}
                  setSeleccion={setSeleccion}
                  cambiarPrimeraPagina={cambiarPrimeraPagina}
                ></SearchBox>
              )
              }
            </div>
          </div>
          <hr className="pb-4"></hr>
          <ul className="list-group zindex ">
            {(datosPaginados.length > 0 && !seleccionBuscador) ||
              (seleccionBuscador && seleccionBuscador.nombre === "todos")
              ? datosPaginados.map((alumno) => (

                <li
                  className="list-group-item m-2 shadow-sm rounded lihover"
                  key={alumno.id}
                >
                  <div className='card-body'>
                    <div className="row justify-content-center align-items-center ">
                      <div className="col-4  ps-4">
                        <h5 className={encontrarCoincidenciaCursoGrupo(alumno.curso, alumno.grupo) ? "card-title" : "warning"}>{alumno.nombre}</h5>

                        <p className="card-subtitle font-weight-light colorTexto">
                          {alumno.apellidos}
                        </p>
                      </div>
                      <div className="col-4  text-center">
                        <small className="card-subtitle text-capitalize">
                          <span className={encontrarCoincidenciaCursoGrupo(alumno.curso, alumno.grupo) ? "colorTexto" : "warning"}> {encontrarCoincidenciaCursoGrupo(alumno.curso, alumno.grupo) ? alumno.curso : "*asignar curso nuevo"}</span>{encontrarCoincidenciaCursoGrupo(alumno.curso, alumno.grupo) ? "-" + alumno.grupo : ""}
                        </small>
                      </div>
                      <div className="col-4">
                        <div className="m-auto text-end pe-4">
                          <Link href={`/docentes/alumnos/${alumno.id}`}>
                            <button
                              type="button"
                              className="border-0 bg-transparent text-secondary material-icons me-2 iconhover"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Ver mas información"
                            >
                              info
                            </button>
                          </Link>
                          <button
                            type="button"
                            className="border-0 bg-transparent text-muted material-icons me-2 iconhover"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Editar cambios en alumno"
                            onClick={() => {
                              nuevoAlumno({
                                id: alumno.id,
                                nombre: alumno.nombre,
                                email: alumno.email,
                                apellidos: alumno.apellidos,
                                curso: alumno.curso,
                                grupo: alumno.grupo,
                                fecha_creacion: alumno.fecha_creacion,
                                fecha_modificacion: generarFecha(),
                              });
                            }}
                          >
                            edit
                          </button>
                          <button
                            type="button"
                            className="border-0 bg-transparent text-danger material-icons iconhover"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Eliminar alumno"
                            onClick={() => {
                              eliminarAlumno(alumno.id);
                            }}
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
              : seleccionBuscador &&
              seleccionBuscador.nombre !== "todos" && (
                <li
                  className="list-group-item m-2 shadow-sm rounded lihover"
                  key={"000"}
                >
                  <div className="card-body">
                    <div className="row justify-content-center align-items-center ">
                      <div className="col-4  ps-4">
                        <h5 className="card-title">
                          {seleccionBuscador.nombre}
                        </h5>
                        <p className="card-subtitle font-weight-light colorTexto">
                          {seleccionBuscador.apellidos}
                        </p>
                      </div>
                      <div className="col-4  text-center">
                        <small className="card-subtitle text-capitalize">
                          {seleccionBuscador.curso} -{" "}
                          {seleccionBuscador.grupo}
                        </small>
                      </div>
                      <div className="col-4">
                        <div className="m-auto text-end pe-4">
                          <button
                            type="button"
                            className="border-0 bg-transparent text-secondary material-icons me-2 iconhover"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Ver mas información"
                          >
                            info
                          </button>
                          <button
                            type="button"
                            className="border-0 bg-transparent text-muted material-icons me-2 iconhover"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Editar cambios en alumno"
                            onClick={() => {
                              nuevoAlumno({
                                id: seleccionBuscador.id,
                                nombre: seleccionBuscador.nombre,
                                email: seleccionBuscador.email,
                                apellidos: seleccionBuscador.apellidos,
                                curso: seleccionBuscador.curso,
                                grupo: seleccionBuscador.grupo,
                                fecha_creacion: seleccionBuscador.fecha_creacion,
                                fecha_modificacion: generarFecha(),


                              });
                            }}
                          >
                            edit
                          </button>
                          <button
                            type="button"
                            className="border-0 bg-transparent text-danger material-icons iconhover"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Eliminar alumno"
                            onClick={() => {
                              eliminarAlumno(seleccionBuscador.id);
                            }}
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )}
          </ul>
          {loading && (
            <div className="m-5">
              <Suspense fallback={<div>Cargando...</div>}>
                <Spinner />
              </Suspense>
            </div>
          )}
          {alumnos && (
            <div className="mt-4 ps-4 pb-5 mb-5">
              <div className="row">
                <div className="col-6">
                  Ver
                  <select
                    id="n-enties"
                    name="n-entries"
                    className="m-2"
                    onChange={(e) => {
                      let numero = parseInt(e.target.value);
                      setNumElementosPorPagina(numero);
                      setPaginaActual(1);
                    }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                  resultados
                </div>
                <div className="col-6 text-end pe-5">
                  <div>
                    <button
                      className="border-0 bg-transparent flecha"
                      disabled={paginaActual === 1}
                      onClick={() => cambiarPagina("anterior")}
                    >
                      <img
                        src="/arrow_circle_left.svg"
                        href="botón izquierdo"
                        width={35}
                      ></img>
                    </button>
                    <span className="d-md-inline d-none">
                      {paginaActual} de {numTotalPaginas}
                    </span>
                    <button
                      className="border-0 bg-transparent flecha"
                      disabled={paginaActual === numTotalPaginas}
                      onClick={() => cambiarPagina("siguiente")}
                    >
                      <img
                        src="/arrow_circle_right.svg"
                        href="botón izquierdo"
                        width={35}
                      ></img>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div >
      )}
      <style>{`
            .warning{
              color: tomato;
            }
         
            .lihover:hover{
              background-color: #247c8c5e;
              cursor:pointer;
              color:white;
              }
            .colorTexto{

              color: #247c8c;
            }
            .colorIcono{
              color:orange;
              cursor: pointer;
            }
            .flecha:hover{
              border-transparent:none;
              border:2px solid orange;
              cursor:pointer;
            }
            {/* .zindex{
               position: relative;
             
                z-index: -1;
            } */}

      `}</style>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
        rel="stylesheet"
      ></link>
    </>
  );
};

// Listado.getInitialProps = async (contexto) => {
//   // Establecer el estado inicial en false en el servidor
//   //para solucionar problemas cuando se intenta recargar la página manualmente
//   return {
//     loading: false,
//     usuarios: null,
//   };
// };

export default Listado;

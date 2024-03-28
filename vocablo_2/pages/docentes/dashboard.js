import { useState, useEffect } from "react";
import Layout from "../../componentes/layouts/Layout";
import Navegacion from "../../componentes/navegacion/Navegacion";
import Donut from "../../componentes/dashboard/donut";
import Radargrafico from "../../componentes/dashboard/radargrafico";
import Spinner from "../../componentes/compartidos/Spinner";
import { Suspense } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useContext } from "react";
import { Usuario } from "../../contexts/contextUsuario";

const Dashboard = () => {
  const { datos, setDatos } = useContext(Usuario);
  const router = useRouter();

  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [seleccionCurso, setSeleccionCurso] = useState(false);
  const [seleccionGrupo, setSeleccionGrupo] = useState(false);

  const [valueCurso, setValueCurso] = useState("Curso");
  const [valueGrupo, setValueGrupo] = useState("Grupo");
  const [valueAlumno, setValueAlumno] = useState("Alumno");

  useEffect(() => {
    // Guardar los datos en el Local Storage
    if (datos != null && datos != undefined) {
      localStorage.setItem("datos", JSON.stringify(datos));
    }
  }, []);

  useEffect(() => {
    // Recuperar los datos del Local Storage
    if (datos === null || datos === undefined) {
      const storedData = localStorage.getItem("datos");
      if (storedData) {
        const data = JSON.parse(storedData);
        setDatos(data);
        obtenerNombreCursos(data);
        setLoading(false);
      }
    } else {
      const fetchDatos = async () => {
        const response = await fetch(
          `/api/alumnos?username=${datos.username}`,
          {
            method: "GET",
          }
        );
        const data = await response.json().catch((e) => {
          setLoading(false);
        });
        // Guardar los datos en el Local Storage
        localStorage.setItem("datos", JSON.stringify(datos));
        setDatos(data);
        obtenerNombreCursos(data);
        setLoading(false);
      };
      fetchDatos();
    }
  }, []);

  useEffect(() => {
    if (valueGrupo === "Grupo") {
      setSeleccionGrupo(false);
      setValueAlumno("Alumno");
    } else {
      setSeleccionGrupo(true);
    }
    if (valueCurso === "Curso") {
      setSeleccionCurso(false);
      setValueGrupo("Grupo");
      setValueAlumno("Alumno");
    } else {
      setSeleccionCurso(true);
    }
  }, [valueAlumno, valueCurso, valueGrupo]);

  function obtenerNombreCursos(data) {
    const cursosArray = data.cursos.map((curso) => curso.nombreCurso);
    setCursos(cursosArray);
  }
  function obtenerGruposPorCurso(data, nombreCurso) {
    const cursoEncontrado = data.cursos.find(
      (curso) => curso.nombreCurso === nombreCurso
    );

    if (cursoEncontrado) {
      setGrupos(cursoEncontrado.grupos);
    } else {
      setGrupos([]);
    }
  }
  function obtenerAlumnosPorCursoYGrupo(data, nombreCurso, grupo) {
    const alumnosFiltrados = data.alumnos.filter((alumno) => {
      return alumno.curso === nombreCurso && alumno.grupo === grupo;
    });

    setAlumnos(alumnosFiltrados);
  }

  return (
    <>
      {datos && (
        <Layout title="docente | estadísticas">
          <Navegacion
            usuario={datos.username}
            loginAuth={datos.loginAuth}
          ></Navegacion>

          <main>
            {loading ? (
              <div className="m-5">
                <Suspense fallback={<div>Cargando...</div>}>
                  <Spinner />
                </Suspense>
              </div>
            ) : datos.cursos == undefined || datos.cursos.length == 0 ? (
              <div
                className="alert alert-warning text-center w-75 m-auto mt-5"
                role="alert"
              >
                <p>No hay estadisticas para mostrar.</p>
                <p>
                  Crea, al menos, un curso y grupo para poder crear tus alumnos
                  y generar estadísticas
                </p>
                <Link href={"/docentes/cursos"}>
                  <a>Crear Curso</a>
                </Link>
              </div>
            ) : (
              <div className=" container my-3">
                <div className="row">
                  <div className="col-3 m-auto text-center my-5">
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      value={valueCurso}
                      onChange={(e) => {
                        setValueCurso(e.target.value);
                        obtenerGruposPorCurso(datos, e.target.value);
                        setCursoSeleccionado(e.target.value);
                      }}
                    >
                      <option value="Curso">Curso</option>
                      {cursos &&
                        cursos.length > 0 &&
                        cursos.map((curso, index) => (
                          <option key={index} value={curso}>
                            {curso}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-3 m-auto text-center mb-5">
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      value={valueGrupo}
                      onChange={(e) => {
                        setValueGrupo(e.target.value);
                        obtenerAlumnosPorCursoYGrupo(
                          datos,
                          cursoSeleccionado,
                          e.target.value
                        );
                      }}
                      disabled={!seleccionCurso}
                    >
                      <option value="Grupo">Grupo</option>
                      {grupos &&
                        grupos.length > 0 &&
                        grupos.map((grupo, index) => (
                          <option key={index} value={grupo}>
                            {grupo}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-6 m-auto text-center mb-5">
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      value={valueAlumno}
                      onChange={(e) => {
                        setValueAlumno(e.target.value);
                      }}
                      disabled={!seleccionGrupo}
                    >
                      <option value="Alumno">Alumno</option>
                      {alumnos &&
                        alumnos.length > 0 &&
                        alumnos.map((alumno) => (
                          <option key={alumno.apellidos} value={alumno.nombre}>
                            {alumno.nombre} {alumno.apellidos}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  {valueAlumno !== "Alumno" ? (
                    <h4 className="m-auto text-center mb-5 text-bg-light p-3 w-75 text-dark">
                      Resultados de{" "}
                      <span className="text-capitalize">{valueAlumno}</span>
                    </h4>
                  ) : (
                    <h4 className="text-center mb-5">Seleccione un alumno</h4>
                  )}
                  <div className="col-10 col-md-4 m-auto shadow-lg bg-white rounded mb-5">
                    <div className="">
                      <h4 className="p-3 text-center text-secondary">
                        Gráfico 1
                      </h4>
                      {/* <Donut></Donut> */}
                    </div>
                  </div>
                  <div className="col-10 col-md-4 m-auto shadow-lg bg-white rounded mb-5">
                    <div className="">
                      <h4 className="p-3 text-center text-secondary">
                        Gráfico 2
                      </h4>
                      {/* <Radargrafico></Radargrafico> */}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col mb-5">
                    <div className="card shadow-lg efecto" key="parametro1">
                      <div className="card-body">
                        <h5 className="card-title">Parámetro 1</h5>
                        <span>320 puntos</span>
                        <div className="progress">
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "25%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-5">
                    <div className="card shadow-lg efecto" key="parametro2">
                      <div className="card-body">
                        <h5 className="card-title">Parámetro 2</h5>
                        <span>227 puntos</span>
                        <div className="progress">
                          <div
                            className="progress-bar bg-danger"
                            role="progressbar"
                            style={{ width: "70%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-3">
                    <div className="card shadow-lg efecto" key="parametro3">
                      <div className="card-body">
                        <h5 className="card-title">Parámetro 3</h5>
                        <span>77 puntos</span>
                        <div className="progress">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "38%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-5">
                    <div className="card shadow-lg efecto" key="parametro4">
                      <div className="card-body">
                        <h5 className="card-title">Parámetro 4</h5>
                        <span>2254 puntos</span>
                        <div className="progress">
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            style={{ width: "75%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-5">
                    <div className="card shadow-lg efecto" key="parametro5">
                      <div className="card-body">
                        <h5 className="card-title">Parámetro 5</h5>
                        <span>279 puntos</span>
                        <div className="progress">
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: "20%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card shadow-lg efecto" key="parametro6">
                      <div className="card-body">
                        <h5 className="card-title">Parámetro 6</h5>
                        <span>528 puntos</span>
                        <div className="progress">
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            style={{ width: "38%" }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </Layout>
      )}
      <style>{`
      
        .efecto:hover{
          border: 2px solid orange;
          b
        }
      `}</style>
    </>
  );
};

export default Dashboard;

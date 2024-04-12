import { useEffect, useState } from "react";

const SearchBoxCurso = ({ datos, setAlumnosFiltradosCursoGrupo }) => {

  const [valueCurso, setValueCurso] = useState("Curso");
  const [valueGrupo, setValueGrupo] = useState("Grupo");
  const [valueAlumno, setValueAlumno] = useState("Alumno");

  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [grupos, setGrupos] = useState([]);

  const [seleccionCurso, setSeleccionCurso] = useState(false);
  const [seleccionGrupo, setSeleccionGrupo] = useState(false);

  useEffect(() => {
    obtenerNombreCursos(datos);

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
    setAlumnosFiltradosCursoGrupo(alumnosFiltrados);
  }
  return (
    <>
      <div className="row">
        <div className="w-50 m-auto text-center my-1">
          <select
            className="form-select form-select-lg textodisplay"
            aria-label=".form-select-lg example"
            value={valueCurso}
            onChange={(e) => {
              setValueCurso(e.target.value);
              obtenerGruposPorCurso(datos, e.target.value);
              setCursoSeleccionado(e.target.value);
              if (e.target.value == "Lista completa") {
                setAlumnosFiltradosCursoGrupo([])
                setValueCurso("Curso")
              }
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
            <option value="Lista completa" className="text-warning textodisplay">Lista completa</option>
          </select>
        </div>
        <div className="w-50 m-auto text-center mb-1">
          <select
            className="form-select form-select-lg textodisplay"
            aria-label=".form-select-lg example"
            value={valueGrupo}
            onChange={(e) => {
              setValueGrupo(e.target.value);
              console.log('value', e.target.value)
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
      </div>
      <style>{`
      .textodisplay{
        font-size:18px;
      }
    `}</style>
    </>
  )

};

export default SearchBoxCurso;

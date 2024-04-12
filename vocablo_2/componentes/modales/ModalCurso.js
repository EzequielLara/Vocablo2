import style from "../../styles/ModalAlumnos.module.css";
import { useState, useEffect, useContext } from "react";
import { Usuario } from "../../contexts/contextUsuario";
import { generarFecha } from "../../shared/generarFecha";
import { generarId } from "../../shared/generarId";
import axios from "axios";

const ModalCurso = ({
  cambiarModal,
  animarModal,
  setAnimarModal,
  cursos,
  setCursos,
  cursoEditar,
  setCursoEditar,
}) => {
  const { datos, setDatos } = useContext(Usuario);
  const [nombreCurso, setNombreCurso] = useState('');
  const [grupos, setGrupos] = useState([]);
  //Formulario
  const [nombreCursoEditar, setNombreCursoEditar] = useState();
  const [nombreGrupo, setNombreGrupo] = useState();
  const [error, setError] = useState(false);
  const [cursoNuevo, setCursoNuevo] = useState(true);

  const [cambiosCurso, setCambioCurso] = useState(cursoEditar);




  useEffect(() => {

    if (Object.keys(cursoEditar).length > 0) {
      setNombreCursoEditar(cursoEditar.nombreCurso);
      setGrupos(cursoEditar.grupos);
      setCursoNuevo(false);

    }
  }, [])


  const listadoGrupos = (curso) => {
    const listado = datos.cursos.filter((cur) => cur.nombreCurso === curso);
    if (listado[0] && listado[0].grupos) {
      setGrupos(listado[0].grupos);
    }
  };


  const ocultarModal = () => {
    setTimeout(() => {
      setAnimarModal();
      setCursoEditar({});
      cambiarModal();
    }, 400);
  };

  const guardarCurso = async () => {
    const usuarioEmail = datos.email;
    const usuarioCursos = datos.cursos;
    if (nombreCursoEditar) {

      const filtroGrupos = grupos.filter((e) => e.trim() !== "");
      const cursoNuevo = {
        id: cursoEditar.id,
        nombreCurso: nombreCursoEditar,
        grupos: filtroGrupos
      };

      //Actualizar
      const cursosActualizados = cursos.map((cursoState) =>
        cursoState.id == cursoEditar.id ? cursoNuevo : cursoState
      );
      const cursosFiltrados = cursosActualizados.filter((c) => c.nombreCurso !== '');
      setCursos(cursosFiltrados);
      setCursoEditar({});
      await axios
        .put("/api/cursos", { cursoNuevo, usuarioCursos, usuarioEmail })
        .catch((e) => console.log(e.response.data.error));
      return;
    }
    //Nuevo
    const nuevo = {
      id: generarId(),
      nombreCurso,
      grupos

    };

    await axios
      .post("/api/cursos", { nuevo, usuarioEmail })
      .catch((e) => console.log(e.response.data.error));
  };

  const resetearFormularioModal = () => {
    setNombreCurso('');
    setGrupos([]);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cursoNuevo) {

      if (grupos.length == 0 || nombreCurso.trim() == "") {

        setError(true);
        return;
      }
    } else {

      if (grupos.length == 0 || cursoEditar.nombreCurso.trim() == "") {

        setError(true);
        return;
      }
    }

    setError(false);
    guardarCurso();
    ocultarModal();
    resetearFormularioModal();
  };
  return (
    <>
      <div className={style.modal}>
        <div className={style.cerrar_modal}>
          <img src="/cerrar.svg" alt="cerrar modal" onClick={ocultarModal} />
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={`${style.formulario} ${animarModal ? style.animar : style.cerrar
            }`}
        >
          <legend>
            {cursoNuevo ? "Nuevo curso" : "Editar curso"}
          </legend>

          {cursoNuevo ? (
            <>
              <div className="text-center mb-3">

                <input
                  className="w-50 p-2 estiloInput"
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Nombre del curso"
                  value={cursoEditar.nombreCurso}
                  onChange={(e) => {

                    const nombreFormateado = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                    setNombreCurso(nombreFormateado);
                    if (grupos.length == 0 || nombreCurso.trim() == "") {

                      setError(true);
                      return;
                    } else {
                      setError(false)
                    }
                  }}
                />
              </div>
              <div className="text-center mb-3">
                <input
                  className="w-50  mt-3 p-2 estiloInput"
                  id="grupo"
                  name="grupo"
                  type="text"
                  placeholder="Nombre del grupo"
                  value={nombreGrupo}

                  onChange={(e) => {
                    const nombreFormateado = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                    setNombreGrupo(nombreFormateado);
                  }}
                />
                <p className="colorIcono text-muted mb-2">{nombreGrupo ? 'Añadir grupos' : ''}</p>

              </div>
              {nombreGrupo ? (
                <span
                  className="w-100 material-symbols-outlined colorIcono mb-5 text-center sizeIcono"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Crear curso nuevo"
                  onClick={() => {
                    setGrupos([...grupos, nombreGrupo]);
                    console.log(nombreGrupo, cursoEditar.nombreCurso)

                    setNombreGrupo('');
                    if (grupos.length == 0 || nombreCurso.trim() == "") {

                      setError(true);
                      return;
                    } else {
                      setError(false)
                    }

                  }}
                >
                  add_circle

                </span>
              ) : ('')}

              <h5 className=" text-center lista mb-5">
                {grupos.length == 0 ? '' : ("* GRUPOS AÑADIDOS:")}
                {grupos.map((grup, index) => (

                  <span
                    key={index}
                    className="w-50 p-2 uno"

                  >{grup},
                  </span>

                ))}
              </h5>
            </>

          ) : (
            <>
              <div className="text-center mb-3">

                <input
                  className="w-50 p-1 ps-3estiloInput"
                  id="nombreCurso"
                  name="nombreCurso"
                  type="text"
                  value={cambiosCurso.nombreCurso}

                  onChange={(e) => {
                    const nombreFormateado = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                    console.log(e.target.value);
                    setCambioCurso({
                      id: cursoEditar.id,
                      nombreCurso: nombreFormateado,
                      grupos: cursoEditar.grupos
                    })

                    setCursoEditar({
                      id: cursoEditar.id,
                      nombreCurso: nombreFormateado,
                      grupos: cursoEditar.grupos
                    })
                    if (grupos.length == 0 || cursoEditar.nombreCurso.trim() == "") {

                      setError(true);
                      return;
                    }

                    setNombreCursoEditar(nombreFormateado);
                    setCursoNuevo(false)
                  }}
                />
              </div>
              <h5 className=" text-center lista mb-3">

                {grupos.map((grup, index) => (
                  <>
                    <div key={index} className="text-center mb-2">
                      <input
                        className="w-50 p-1 ps-3 estiloInput"
                        id="grupoCurso"
                        name="grupoCurso"
                        type="text"
                        value={cambiosCurso.grupos[index]}
                        onChange={(e) => {

                          const nombreFormateado = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                          const indice1 = index;
                          const arrayModificado = cursoEditar.grupos.map((elemento, indice) => {
                            if (indice === indice1) {
                              return nombreFormateado; // Sustituye el valor
                            }
                            return elemento; // Conserva el valor original si no coincide
                          });
                          const sinVacios = arrayModificado.filter((e) => e.trim() !== "")
                          setCambioCurso({
                            id: cursoEditar.id,
                            nombreCurso: cursoEditar.nombreCurso,
                            grupos: sinVacios
                          })
                          setCursoEditar({
                            id: cursoEditar.id,
                            nombreCurso: cursoEditar.nombreCurso,
                            grupos: sinVacios
                          })
                          setGrupos(sinVacios)
                          setCursoNuevo(false)
                        }}
                      />
                    </div>

                  </>
                ))}
              </h5>
              <div className="text-center mb-2">
                <input
                  className="w-50  mt-3 p-1 ps-3 estiloInput"
                  id="grupo"
                  name="grupo"
                  type="text"
                  placeholder="Nombre del grupo nuevo"
                  value={nombreGrupo}
                  onChange={(e) => {
                    const nombreFormateado = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
                    setNombreGrupo(nombreFormateado);

                  }}
                />

                <p className="colorIcono text-muted mb-2">{nombreGrupo ? 'Añadir grupo' : ''}</p>
              </div>
              {nombreGrupo ? (

                <span
                  className="w-100 material-symbols-outlined colorIcono mb-2 text-center sizeIcono"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Crear curso nuevo"

                  onClick={() => {
                    setGrupos([...grupos, nombreGrupo]);
                    setCambioCurso({
                      id: cursoEditar.id,
                      nombreCurso: cursoEditar.nombreCurso,
                      grupos: [...grupos, nombreGrupo]
                    })

                    setNombreGrupo('');
                    console.log(grupos.length, nombreCursoEditar)
                    if ((nombreGrupo != '' || nombreGrupo != undefined) && cambiosCurso.nombreCurso.trim() != '') {
                      setError(false);
                      console.log('cambiado')
                    } else {
                      setError(true)
                    }

                  }}
                >
                  add_circle

                </span>
              ) : ('')}
            </>
          )}
          {error ? (<h5 className="uno w-50 mt-2 mx-auto">*No se admiten campos vacíos</h5>) : ('')}
          <input
            className="boton p-2 ps-3 w-50 mx-auto"
            id="boton"
            name="boton"
            type="submit"
            value={cursoNuevo ? "Añadir Curso" : "Modificar Curso"}
          />
        </form>
      </div>
      <style>{`
				.boton{
					font-size:1rem;
				}
				.uno{
					color:tomato;
				}
				.estiloInput{
					background-color:transparent;
					border: 2px solid white;
					color:white;
					font-size:1rem;
				}
				.lista{
					
					background-color:transparent;
					border: 0px;
					color:tomato;
					font-size:1.2rem;
				}
				.estiloSelect{
					border-radius: 10px;
					border: 2px solid white;
					color:black;
					font-size:1.2rem;
					text-align:center;
				}
				 .colorIcono{
              		color:white;
              		cursor: pointer;
				 }
				 .sizeIcono{
					text-align:center;
					font-size: 30px !important ;
					vertical-align: middle;
				 }
				 .read input{
					 cursor: none;
					  pointer-events: none;
					  user-select: none;
				 }						
            
		`}</style>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    </>
  );
};
export default ModalCurso;

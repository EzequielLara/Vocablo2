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
	const [nombreGrupo, setNombreGrupo] = useState();
	const [grupos, setGrupos] = useState();

	const [gruposEditar, setGruposEditar] = useState();
	const [nombreCursoEditar, setNombreCursoEditar] = useState();
	const [error, setError] = useState(false);

	useEffect(() => {
		console.log("grupos", gruposEditar);
		if (Object.keys(cursoEditar).length > 0) {
			setNombreCursoEditar(cursoEditar.nombreCurso);
			setGruposEditar(cursoEditar.grupos);

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
		const usuario = datos;
		if (cursoEditar) {
			const cursoNuevo = {
				nombreCurso,
				grupos
			};
			console.log("curso NUEVO: ", cursoEditar);
			//Actualizar
			const cursosActualizados = cursos.map((cursoState) =>
				cursoState.id == cursoEditar.id ? cursoNuevo : cursoState
			);
			setCursos(cursosActualizados);
			setCursoEditar({});
			await axios
				.put("/api/cursos", { cursoNuevo, usuario })
				.catch((e) => console.log(e.response.data.error));
			return;
		}
		//Nuevo
		const nuevo = {
			id: generarId(),
			fecha_creacion: generarFecha(),
			nombre: nombrecurso,
			apellidos: apellidoscurso,
			curso: cursocurso,
			grupo: grupocurso,
		};

		await axios
			.post("/api/cursos", { nuevo, usuario })
			.catch((e) => console.log(e.response.data.error));
	};

	const resetearFormularioModal = () => {
		setNombrecurso("");
		setApellidoscurso("");
		setCursocurso("");
		setGrupocurso("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			nombrecurso.trim() == "" ||
			apellidoscurso.trim() == "" ||
			cursocurso.trim() == "" ||
			grupocurso.trim() == ""
		) {
			setError(true);
			return;
		}
		setError(false);
		guardarcurso();
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
						{cursoEditar.nombreCurso ? "Editar curso" : "Nuevo curso"}
					</legend>
					<div className="text-center mb-3">
						<label className="pe-5" htmlFor="curso">
							Curso:
						</label>
						<input
							className="w-50 p-2 estiloInput"
							id="nombre"
							name="nombre"
							type="text"
							placeholder="Nombre del curso"
							value={nombreCursoEditar}
							onChange={(e) => {
								setNombreCurso(e.target.value);
							}}
						/>
					</div>
					{cursoEditar.grupos.map(grup => (
						<div className="text-center mb-2">
							<label className="pe-5" htmlFor="grupo">
								grupo:
							</label>


							<input
								className="w-50 p-2 estiloInput"
								id="nombreGrupo"
								name="nombreGrupo"
								type="text"
								placeholder="Apellidos del curso"
								value={grup}
								onChange={(e) => {
									setNombreGrupo(e.target.value);
								}}
							/>

						</div>
					))}
					{error && <h5 className="uno">*No se admiten campos vacíos</h5>}
					<input
						id="boton"
						name="boton"
						type="submit"
						value={cursoEditar.nombreCurso ? "Modificar Curso" : "Añadir Curso"}
					/>
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
export default ModalCurso;

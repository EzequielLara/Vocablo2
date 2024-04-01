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
	const [cursoNuevo, setCursoNuevo] = useState(true)




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

		if (
			// nombreCurso.trim() == "" ||
			grupos.length == 0
		) {
			setError(true);
			return;
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
					onSubmit={handleSubmit}
					className={`${style.formulario} ${animarModal ? style.animar : style.cerrar
						}`}
				>
					<legend>
						{cursoEditar.nombreCurso ? "Editar curso" : "Nuevo curso"}
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
								<p className="colorIcono mb-2">Añadir uno o más grupos</p>

							</div>
							{nombreGrupo ? (
								<span
									className="w-100 material-symbols-outlined colorIcono mb-5 text-center sizeIcono"
									data-toggle="tooltip"
									data-placement="top"
									title="Crear curso nuevo"
									onClick={() => {
										setGrupos([...grupos, nombreGrupo]);
										setNombreGrupo('');
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
									className="w-50 p-2 estiloInput"
									id="nombre"
									name="nombre"
									type="text"
									placeholder={cursoEditar.nombreCurso}
									onBlur={(e) => {
										const nombreFormateado = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
										setCursoEditar({
											id: cursoEditar.id,
											nombreCurso: nombreFormateado,
											grupos: cursoEditar.grupos
										})

										setNombreCursoEditar(nombreFormateado)
									}}
								/>
							</div>
							<h5 className=" text-center lista mb-3">
								{grupos.map((grup, index) => (
									<>
										<div key={index} className="text-center mb-2">
											<input
												className="w-50 p-2 estiloInput"
												id="grupo"
												name="grupo"
												type="text"
												placeholder={grup}
												onBlur={(e) => {

													const nombreFormateado = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
													const indice1 = index;
													const arrayModificado = cursoEditar.grupos.map((elemento, indice) => {
														if (indice === indice1) {
															return nombreFormateado; // Sustituye el valor
														}
														return elemento; // Conserva el valor original si no coincide
													});
													const sinVacios = arrayModificado.filter((e) => e.trim() !== "")
													setCursoEditar({
														id: cursoEditar.id,
														nombreCurso: cursoEditar.nombreCurso,
														grupos: sinVacios
													})
													setGrupos(sinVacios)

												}}
											/>
										</div>

									</>
								))}
							</h5>
							<div className="text-center mb-2">
								<input
									className="w-50  mt-3 p-2 estiloInput"
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
								<p className="colorIcono mb-2">Añadir grupos nuevos</p>

							</div>
							<span
								className="w-100 material-symbols-outlined colorIcono mb-3 text-center sizeIcono"
								data-toggle="tooltip"
								data-placement="top"
								title="Crear curso nuevo"
								onClick={() => {
									setGrupos([...grupos, nombreGrupo]);
									setNombreGrupo('');
								}}
							>
								add_circle

							</span>
						</>
					)}
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
					color:white;
				}
				.estiloInput{
					background-color:transparent;
					border: 2px solid white;
					color:white;
					font-size:1.2rem;
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
					font-size: 35px !important ;
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

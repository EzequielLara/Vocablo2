import { useEffect, useState } from "react";
import { Usuario } from "../contexts/contextUsuario";
import { useContext } from "react";
import Spinner from "../componentes/compartidos/Spinner";
import { Suspense } from "react";
import Link from "next/link";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ListadoCursos = ({ nuevoCurso }) => {
	const { datos, setDatos } = useContext(Usuario);

	const [cursos, setCursos] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
	}, []);

	useEffect(() => {
		const fetchDatos = async () => {
			const response = await fetch(`/api/alumnos?email=${datos.email}`, {
				method: "GET",
			});
			const data = await response.json();
			setDatos(data);
			setCursos(data.cursos);
			setLoading(false);
		};
		fetchDatos();
		// setLoading(false);
	}, []);

	const eliminarCurso = (cursoSeleccionado) => {
		const fetchEliminarCurso = async () => {
			try {

				const response = await fetch(
					`/api/cursos?usuarioEmail=${datos.email}&curso=${cursoSeleccionado.nombreCurso}`,
					{
						method: "DELETE",
					}
				);
				if (response.ok) {
					await response.json();
					// Actualizar el estado local de los alumnos
					const updatedCursos = cursos.filter(
						(curso) => curso.nombreCurso !== cursoSeleccionado.nombreCurso
					);
					setCursos(updatedCursos);
					console.log("cursos para pintar", cursos)
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
			text: "¿Desea eliminar el curso completo?. " + " Recuerde que se eliminarán también todos los grupos y los alumnos que estuviesen asociados quedarán sin grupo",
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
				fetchEliminarCurso();
				Swal.fire({
					text: "Curso eliminado",
					icon: "success",
				});
			} else if (result.isDenied) {
				Swal.fire({
					text: "Opción de eliminar el curso descartada",
					icon: "error",
				});
			}
		});
	};

	return (
		<>
			{loading ? (
				<div className="m-5">
					<Suspense fallback={<div>Cargando...</div>}>
						<Spinner />
					</Suspense>
				</div>
			) : (
				<div className="container w-auto mt-5 mb-5 pb-5">
					<div className="row justify-content-center align-items-center ">
						<div className="col-4 ">
							<h4 className="colorTexto">Administrador de cursos</h4>
						</div>
						<div className="col-1 text-center">
							<span
								className="material-symbols-outlined colorIcono"
								data-toggle="tooltip"
								data-placement="top"
								title="Crear curso nuevo"
								onClick={() => {
									nuevoCurso({});
								}}
							>
								add_circle

							</span>
						</div>

					</div>
					<hr className="pb-4"></hr>
					<ul className="list-group zindex ">
						{cursos.map((curso, index) => (

							<li
								className="list-group-item m-2 shadow-sm rounded lihover"
								key={curso.nombreCurso}
							>
								<div className="card-body">
									<div className="row justify-content-center align-items-center ">
										<div className="col-4 p-2 ps-4">
											<p className="card-subtitle font-weight-light colorTexto">
												Curso
											</p>
											<h5 className="card-title">{curso.nombreCurso}</h5>
										</div>
										<div className="col-4  text-center">
											<small className="card-subtitle text-capitalize">
												{
													curso.grupos.map((grupo, index) => (
														<div key={index} className="m-2">
															<p className="card-title">
																<span className="card-subtitle font-weight-light colorTexto"> Grupo </span>{grupo}
															</p>
														</div>
													))
												}
											</small>

										</div>
										<div className="col-4">
											<div className="m-auto text-end pe-4">
												<button
													type="button"
													className="border-0 bg-transparent text-muted material-icons me-2 iconhover"
													data-toggle="tooltip"
													data-placement="top"
													title="Editar cambios en el curso"
													onClick={() => {
														nuevoCurso(curso);
													}}
												>
													edit
												</button>
												<button
													type="button"
													className="border-0 bg-transparent text-danger material-icons iconhover"
													data-toggle="tooltip"
													data-placement="top"
													title="Eliminar curso"
													onClick={() => {
														eliminarCurso(curso);

													}}
												>
													delete
												</button>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>

				</div>
			)
			}
			<style>{`
						.iconoSize{
							font-size: 20px !important;
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
							font-size: 35px !important ;
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
			<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
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

export default ListadoCursos;

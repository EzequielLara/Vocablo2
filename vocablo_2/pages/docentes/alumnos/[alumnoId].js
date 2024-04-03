
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Usuario } from "../../../contexts/contextUsuario";
import { Suspense } from "react";
import Spinner from "../../../componentes/compartidos/Spinner";

export default function AlumnoId() {
    const router = useRouter();
    const { alumnoId } = router.query;
    const { datos, setDatos } = useContext(Usuario);

    const [id, setId] = useState(null)
    const [alumno, setAlumno] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (alumnoId) {
            localStorage.setItem("alumnoId", JSON.stringify(alumnoId));
            setId(alumnoId);
        }
    }, [alumnoId]);

    useEffect(() => {
        if (!alumnoId) {
            const recuperaId = localStorage.getItem("alumnoId");


            if (recuperaId) {
                setId(JSON.parse(recuperaId));
                setLoading(false);

            }
        }
        if (!datos) {
            const recuperaDatos = localStorage.getItem("myContextData");

            if (recuperaDatos) {
                setId(JSON.parse(recuperaDatos));
                setDatos(recuperaDatos);

            }
        }
    }, []);

    useEffect(() => {
        try {
            if (datos.alumnos) {
                const alumnoBuscado = datos.alumnos.find(e => e.id == alumnoId);
                setAlumno(alumnoBuscado);
                setLoading(false);
            }

        } catch (error) {
            console.log('Error:', error);
        }
    }, [alumnoId, datos]);

    const salir = () => {

        router.back();

    }
    const handleSubmit = () => {
        console.log('pulsado')
    }

    return (
        <div className="container">
            {loading ? (
                <div className="m-5">
                    <Suspense fallback={<div>Cargando...</div>}>
                        <Spinner />
                    </Suspense>
                </div>
            ) : (
                <div>
                    {alumno ? (

                        <div>
                            <div className="cerrar_modal">
                                <img src="/cerrar.svg" alt="cerrar modal" onClick={salir} />
                            </div>
                            <div className="titulo">
                                <div>
                                    {`${alumno.nombre} ${alumno.apellidos} `}
                                </div>

                            </div>
                            <div className="w-50 w-md-100 mx-auto pt-3">
                                <div className="row ms-1 ">
                                    <div className="col input-group ">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text azul" id="inputGroup-sizing-default">curso</span>

                                        </div>
                                        <input readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={alumno.curso} />
                                    </div>
                                    <div className="col input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text azul" id="inputGroup-sizing-default">grupo</span>
                                        </div>
                                        <input readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={alumno.grupo} />
                                    </div>
                                </div>
                                <div className="input-group m-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text azul" id="inputGroup-sizing-default">email</span>
                                    </div>
                                    <input readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={alumno.curso} />
                                </div>
                                <div className="input-group m-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text azul" id="inputGroup-sizing-default">usuario creado</span>
                                    </div>
                                    <input readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={alumno.fecha_creacion} />
                                </div>
                                <div className="input-group m-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text azul" id="inputGroup-sizing-default">última conexión</span>
                                    </div>
                                    <input readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={alumno.fecha_creacion} />
                                </div>


                            </div>
                        </div>
                    ) : (<p>No hay datos para mostrar.... recargue la página</p>)
                    }
                </div>
            )
            }
            <style>{`
            body{
                margin:0;
                padding:0;
                background-color: rgba(0, 0, 0, 0.85);
            }
            .cerrar_modal {
                position: absolute;
                right: 2rem;
                top: 2rem;
                width: 1.8rem;
                height: 2rem;
                z-index: 4;
                
            }
            .container{
                width:100%;
                font-size: 1.6rem;
                font-family: sans-serif;
                margin:auto;
                padding:0px;
                height:100vh;
                
}
            .titulo{
                margin:auto;
                margin-top:5.5%;
                height:50px;
                width:70%;
                font-weight: 700;
                text-align: center;
                text-transform: uppercase;
                color: #ffffff;
                margin-bottom: 2.5rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #3b82f6;
            }
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
                font-size:1rem;
                text-align:center;
            }
            .azul{
                background-color: #1048a4;
                border: none;
                padding: 1rem;
                text-align: center;
                font-family:sans-serif;
                color: #ffffff;
                font-weight: 900;
                text-transform: uppercase;
                font-size: 1rem;
            }
            .letra{
                text-align: center;
                font-family:  sans-serif;
                color:#1048a4;
                font-weight: 700;
                text-transform: uppercase;
                font-size: 1rem;
            }
      `}</style>
        </div>
    )
}


import FormularioAlumno from '../../componentes/FormularioAlumno'

const LoginAlumnos=()=>{
    return(
        <div className=" row my-5">
            <div className="col col-md-6 col-lg-4 m-auto">
                <div className="card shadow-lg rounded">
                    <FormularioAlumno></FormularioAlumno>
                </div>
            </div>
        </div>
    )
}
export default LoginAlumnos;
import FormularioAlumno from '../componentes/FormularioAlumno'
import LayoutMainContent from "../componentes/layouts/LayoutMainContent";

const LoginAlumnos = () => {
  return (
    <LayoutMainContent title="login | alumnos" content="vocablo">
      <div className=" row my-5">
        <div className="col col-md-6 col-lg-4 m-auto">
          <div className="card shadow-lg rounded">
            <FormularioAlumno></FormularioAlumno>
          </div>
        </div>
      </div>
    </LayoutMainContent>
  )
}
export default LoginAlumnos;
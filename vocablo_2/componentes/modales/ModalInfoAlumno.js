const ModalInfoAlumno = ({ alumno, salir }) => {

  return (

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
            <input autoComplete="off" readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" name="curso" value={alumno.curso} />
          </div>
          <div className="col input-group">
            <div className="input-group-prepend">
              <span className="input-group-text azul" id="inputGroup-sizing-default">grupo</span>
            </div>
            <input autoComplete="off" readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" name="grupo" value={alumno.grupo} />
          </div>
        </div>
        <div className="input-group m-3">
          <div className="input-group-prepend">
            <span className="input-group-text azul" id="inputGroup-sizing-default">email</span>
          </div>
          <input autoComplete="off" readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" name="email" value={alumno.email} />
        </div>
        <div className="input-group m-3">
          <div className="input-group-prepend">
            <span className="input-group-text azul" id="inputGroup-sizing-default">usuario creado</span>
          </div>
          <input autoComplete="off" readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" name="creado" value={alumno.fecha_creacion} />
        </div>
        <div className="input-group m-3">
          <div className="input-group-prepend">
            <span className="input-group-text azul" id="inputGroup-sizing-default">última conexión</span>
          </div>
          <input autoComplete="off" readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" name="conexion" value={alumno.fecha_modificacion} />
        </div>
        <div className="m-3">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label letra" for="flexSwitchCheckDefault">Restringir acceso</label>
          </div>
        </div>



      </div>

    </div>
  )
}

export default ModalInfoAlumno;
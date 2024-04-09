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
          <input readOnly disabled type="text" className="form-control letra" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={alumno.email} />
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
  )
}

export default ModalInfoAlumno;
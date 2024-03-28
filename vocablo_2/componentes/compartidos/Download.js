const Download = ({
  key,
  titulo,
  descripcion,
  imagen,
  direccionArchivo,
  nombreDescarga,
  imagenSize,
  autor,
}) => {
  return (
    <>
      <div className="shadow m-2 p-3 mb-5 bg-white rounded tarjeta">
        <div className="row">
          <div className="col-3">
            <img
              alt={nombreDescarga}
              src={imagen}
              width={imagenSize}
              className="m-3 "
            ></img>
          </div>
          <div className="col ">
            <small className="text-justify">{descripcion}</small>
          </div>
        </div>
        <small className="pt-2">
          <span className="fw-bold">Autor: </span>
          {autor}
        </small>
        <div className="font-weight-bold   bg-warning text-center mt-2">
          <a
            href={direccionArchivo}
            download={nombreDescarga}
            className="text-decoration-none text-reset"
          >
            <p>{titulo}</p>
          </a>
        </div>
      </div>
      <style>{`
        .tarjeta {
          width:350px;
          min-width:280px;
        }
      
      
      `}</style>
    </>
  );
};

export default Download;

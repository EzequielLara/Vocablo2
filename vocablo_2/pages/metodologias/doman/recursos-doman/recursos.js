import Download from "../../../../componentes/compartidos/Download";
import LayoutMainContent from "../../../../componentes/layouts/LayoutMainContent";
import Link from "next/link";

const recursos = () => {
  const descargables = [
    {
      titulo: "Cómo enseñar a leer a su bebé",
      descripcion:
        "Versíon en español de las páutas para aplicar el método Doman.",
      direccionArchivo:
        "/descargas/libro-como-ensenar-a-leer-a-su-bebe-glenn-doman.pdf",
      imagen: "/descargar.png",
      nombreDescarga: "metodo-doman.pdf",
      imagenSize: "50",
      autor: "Glenn Doman",
    },
    {
      titulo: "Método Doman en la escuela",
      descripcion: "Aplicaciones del método Doman en los institutos",
      direccionArchivo: "/descargas/adaptado-escuela.pdf",
      imagen: "/descargar.png",
      nombreDescarga: "Escuela-doman.pdf",
      imagenSize: "50",
      autor: "Víctor Estalayo y Rosario Vega",
    },
    {
      titulo: "Propuesta de iniciación a la lectura",
      descripcion:
        "Trabajo de fin de grado de la universidad de Rioja sobre el método Doman",
      direccionArchivo: "/descargas/UNIR_ESTUDIO_DEL_TRABAJO.pdf",
      imagen: "/descargar.png",
      nombreDescarga: "UNIR_doman.pdf",
      imagenSize: "50",
      autor: "Universidad Internacional de la Rioja",
    },
  ];
  return (
    <>
      <LayoutMainContent title="doman-recursos" content="método doman">
        <div className="imgvocablo">
          <Link href={"/"}>
            <a>
              <img alt="Logo vocablo" src="/logo_vocablo_700.png" width="200" />
            </a>
          </Link>
        </div>
        <h3 className="title">Recursos Doman</h3>
        <h5 className="ms-3">Libros y documentos:</h5>
        <hr></hr>
        <div className="m-5 row">
          {descargables.map((libro, index) => (
            <Download
              key={index}
              titulo={libro.titulo}
              descripcion={libro.descripcion}
              direccionArchivo={libro.direccionArchivo}
              imagen={libro.imagen}
              nombreDescarga={libro.nombreDescarga}
              imagenSize={libro.imagenSize}
              autor={libro.autor}
            ></Download>
          ))}
        </div>
      </LayoutMainContent>
      <style>{`
           .title{
            margin-bottom:60px;
            color:#247c8c;
            text-align:center;
            }
          @media (max-width:440px){
            .imgvocablo{
              width:100%;
              text-align:center;
              margin-top:15px;
            }
            .title{
              width:100%;
              text-align:center;
              margin-top:0px;
            }  
      `}</style>
    </>
  );
};
export default recursos;

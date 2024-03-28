import axios from "axios";
import { useRouter } from "next/router";

export default function Prueba() {
  const router = useRouter();

  const borrar = async (e) => {
    e.preventDefault();
    const respuesta = await axios.post("/api/auth/logout");
    router.push("/");
  };

  return (
    <div className=" row my-5">
      <div className="col col-md-6 col-lg-4 m-auto">
        <div className="card shadow-lg rounded">
          <div className="text-center mt-3 ">
            <img alt="Logo vocablo" src="/logo_vocablo_700.png" width="255" />
          </div>
          <div className="card-body p-4">
            <h5 className="card-title text-center">¿Desea cerrar la sesión?</h5>
            <p className="card-text text-center mb-4">
              Se le redirigirá a la página de inicio.
            </p>
            <button
              className="btn btn-outline-warning  w-100 text-center m-auto"
              onClick={(e) => borrar(e)}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from "../styles/Formularios.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const FormularioAlumno = () => {

  const [datosUsuarioSesion, setDatosUsuarioSesion] = useState({
    email: "",
    password: "",

  });

  //Errores al validar
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleChange = ({ target }) => {
    const { name, value } = target
    setDatosUsuarioSesion({
      ...datosUsuarioSesion,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    await axios
      .post("/api/auth/loginalumos", datosUsuarioSesion)
      .catch((e) => setError(e.response.data.error));

    router.push("/alumnos");
  };

  return (
    <>
      <div className="border-1 rounded-4 shadow-lg">
        <div className={"w-75 m-auto p-2 pt-4 pb-4"}>
          <Link href="/" as="image">
            <a>
              <Image
                src="/logo_vocablo_700.png"
                width={400}
                height={130}
                layout="responsive"
                priority="true"
              />
            </a>
          </Link>
        </div>
        <div className="w-100 m-auto p-2">
          <div className="form-group pt-2 pb-2">
          </div>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit} className="w-75 m-auto p-2">
          {error && (
            <div className="alert alert-warning" role="alert">
              {error}
            </div>
          )}
          <div className="form-group mb-4 mt-2">
            <input
              name="email"
              type="email"
              value={datosUsuarioSesion.email}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              value={datosUsuarioSesion.password}
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <div className="w-100 m-auto text-center text-decoration-none p-2">
              <Link href={"/alumno/restaurar"} >
                <a><small>He olvidado la contraseña</small></a>
              </Link>

            </div>
          </div>


          <div className="d-flex justify-content-center p-4">
            <button
              type="submit"
              className="ho rounded-2 p-2 w-100 pt-2 pb-2"
            >
              Iniciar Sesion
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .ho{
          background-color:transparent;
          border:1px solid grey;
          color:grey;
        }
        .ho:hover{
          color:#FFC172;
          border-color:#FFC172;
        }
  
  `}</style>
    </>
  )
};



export default FormularioAlumno;

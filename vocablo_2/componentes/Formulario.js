import styles from "../styles/Formularios.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import axios from "axios";

const Formulario = ({ providers }) => {
  // Tenemos dos formularios, el de registro y el de iniciar sesión, por lo tanto dos estados con los datos de cada formulario.
  const [datosUsuarioSesion, setDatosUsuarioSesion] = useState({
    email: "",
    password: "",
    loginAuth: false,
  });
  const [datosUsuarioRegistro, setDatosUsuarioRegistro] = useState({
    email: "",
    username: "",
    password: "",
    loginAuth: false,
  });

  // Estados para controlar cual de los dos formularios se mostrará
  const [iniciarSesion, setIniciarSesion] = useState(false);

  //Errores al validar
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    setDatosUsuarioSesion({
      ...datosUsuarioSesion,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeRegister = (e) => {
    setDatosUsuarioRegistro({
      ...datosUsuarioRegistro,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/auth/login", datosUsuarioSesion)
      .catch((e) => setError(e.response.data.error));

    router.push("/docentes");
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const usuarioValido = await axios
      .post("/api/auth/register", datosUsuarioRegistro)
      .catch((e) => {
        setError(e.response.data.error);
      });

    if (usuarioValido && usuarioValido.status === 200) {
      setError(null);
      setDatosUsuarioSesion({
        email: datosUsuarioRegistro.email,
        password: datosUsuarioRegistro.password,
      });
      setIniciarSesion(!iniciarSesion);
    }
  };

  return (
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

      {iniciarSesion === false ? (
        <>
          <div className="w-75 m-auto p-2">
            <div className="form-group pt-2 pb-2">
              {providers &&
                Object.values(providers).map((provider) => {
                  const { id, type } = provider;
                  return (
                    <button
                      key={id}
                      className="form-control mb-2 bg-light"
                      onClick={() => signIn(id, { callbackUrl: "/docentes" })}
                    >
                      {id === "github" ? (
                        <img
                          src="/github-mark/github-mark.svg"
                          width={25}
                          height={25}
                          className=""
                        />
                      ) : (
                        <img
                          src="/google-icon.svg"
                          width={25}
                          height={25}
                          className=""
                        />
                      )}
                      <span className="ps-3 fw-light">
                        Inicia sesión con {id}
                      </span>
                    </button>
                  );
                })}
            </div>
            <hr></hr>
          </div>
          <form onSubmit={handleSubmit} className="w-75 m-auto p-2">
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
                autoComplete="true"
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
                autoComplete="true"
                required
              />
            </div>

            <div className="d-flex justify-content-center p-4">
              <button
                type="submit"
                className="border border-dark text-dark bg-transparent rounded-2 p-2 w-100 pt-2 pb-2"
              >
                Iniciar Sesion
              </button>
            </div>
          </form>
          <div>
            <button
              className={styles.boton_registro}
              onClick={() => {
                if (!iniciarSesion) {
                  setDatosUsuarioRegistro({
                    email: datosUsuarioSesion.email,
                    username: "",
                    password: datosUsuarioSesion.password,
                  });
                }
                setIniciarSesion(!iniciarSesion);
              }}
            >
              {iniciarSesion ? "* Iniciar Sesión" : "* Registrarme"}
            </button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <form className="w-75 m-auto p-2">
            {error && (
              <div className="alert alert-warning" role="alert">
                {error}
              </div>
            )}
            <div className="form-group mb-4">
              <input
                type="email"
                value={datosUsuarioRegistro.email}
                name="email"
                className="form-control"
                id="email2"
                aria-describedby="emailHelp"
                placeholder="Email"
                autoComplete="true"
                onChange={handleChangeRegister}
                required
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                name="username"
                value={datosUsuarioRegistro.username}
                className="form-control"
                id="name2"
                aria-describedby="name"
                placeholder="Nombre"
                autoComplete="true"
                onChange={handleChangeRegister}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={datosUsuarioRegistro.password}
                className="form-control"
                id="password2"
                placeholder="Password"
                autoComplete="true"
                onChange={handleChangeRegister}
                required
              />
            </div>
            <div className="d-flex justify-content-center p-4">
              <button
                type="button"
                className="border border-dark text-dark bg-transparent rounded-2 p-2 w-100 pt-2 pb-2"
                onClick={handleRegister}
              >
                Registrarme
              </button>
            </div>
          </form>
          <div>
            <button
              className={styles.boton_registro}
              onClick={() => {
                setIniciarSesion(!iniciarSesion);
              }}
            >
              {iniciarSesion ? "* Iniciar Sesión" : "* Registrarme"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Formulario;

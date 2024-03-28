import Link from "next/link";
import NavUsuario from "./NavUsuario";
import { useState } from "react";

const Navegacion = ({ usuario, loginAuth }) => {
  const [display, setDisplay] = useState(false);

  const toggle = () => {
    setDisplay(!display);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link href={"/"} as="image">
            <a className="logo">
              <img
                alt="Logo vocablo"
                src="/logo_vocablo_700.png"
                width="200"
                className="d-inline-block align-top"
              />
            </a>
          </Link>
          <div className="navbar-collapse" id="navbarNav">
            <button
              className="d-lg-none my-3 font-size-large display-5 text-warning border-0 bg-transparent"
              type="button"
              onClick={toggle}
            >
              <i className="bi bi-list"></i>
            </button>
            <ul className={display ? "navbar-nav display" : "navbar-nav"}>
              <li className="nav-item me-3">
                <Link
                  href={"/descargas/ManualUsuario_vocablo.pdf"}
                  className="nav-link"
                >
                  <a className="nav-link" target="_blank">
                    Manual de usuario
                  </a>
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link href={"/docentes"} className="nav-link">
                  <a className="nav-link">Recursos</a>
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link href={"/docentes/cursos"}>
                  <a className="nav-link" href="#">
                    Cursos
                  </a>
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link href={"/docentes/alumnos"}>
                  <a className="nav-link" href="#">
                    Alumnos
                  </a>
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link href={"/docentes/dashboard"}>
                  <a className="nav-link" href="#">
                    Dashboard
                  </a>
                </Link>
              </li>
              <li className="nav-item ms-0 ms-lg-5 ms-md-0">
                <NavUsuario
                  usuario={usuario}
                  loginAuth={loginAuth}
                ></NavUsuario>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <style>{`
        .logo{
          padding-right:15%;
        }
        .cristal{
          
           backdrop-filter: blur(5px);
           border-bottom: 1px solid black; 
        }
        .display{
          display:none;
        }
      `}</style>
    </>
  );
};

export default Navegacion;

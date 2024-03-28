import Link from "next/link";
import Layout from "../../../../componentes/layouts/Layout";
import TarjetasLink from "../../../../componentes/compartidos/TarjetasLink";
import styles from "../../../../styles/Home.module.css";

const Aplicaciones = () => {
  return (
    <>
      <>
        <div className="imgvocablo">
          <div className="imgvocablo">
            <Link href={"/"}>
              <a>
                <img
                  alt="Logo vocablo"
                  src="/logo_vocablo_700.png"
                  width="200"
                />
              </a>
            </Link>
          </div>
        </div>
        <Layout title="app-doman">
          <main className={styles.main}>
            <div className={styles.grid}>
              <TarjetasLink
                href="/metodologias/doman/app-doman/app_1"
                titulo="Acierta la imagen"
                parrafo="Relaciona cada palabra con su imagen"
              />
              <TarjetasLink
                href="/metodologias/doman/app-doman/app2"
                titulo="Recurso 2"
                parrafo="Aplicación Doman de ejemplo en construcción"
                anularEnlace
              />
              <TarjetasLink
                href="/metodologias/doman/app-doman/app2"
                titulo="Recurso 3"
                parrafo="Aplicación Doman de ejemplo en construcción"
                anularEnlace
              />
              <TarjetasLink
                href="/metodologias/doman/app-doman/app2"
                titulo="Recurso 4"
                parrafo="Aplicación Doman de ejemplo en construcción"
                anularEnlace
              />
            </div>
          </main>
        </Layout>
        <style>{`
       @media (max-width:440px){
            .imgvocablo{
              width:100%;
              text-align:center;
              margin-top:15px;
            }      
        }
    `}</style>
      </>
    </>
  );
};

export default Aplicaciones;

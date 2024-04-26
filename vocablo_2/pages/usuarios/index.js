import Layout from "../../componentes/layouts/Layout";
import Link from "next/link";
import TarjetasLink from "../../componentes/compartidos/TarjetasLink";
import styles from "../../styles/Home.module.css";

const Home = () => {
  return (
    <>
      <Layout title="familias" className="container">
        <div className="imgvocablo">
          <Link href={"/"}>
            <a>
              <img alt="Logo vocablo" src="/logo_vocablo_700.png" width="200" />
            </a>
          </Link>
        </div>
        <main className={styles.main}>
          <div className={styles.grid}>
            <TarjetasLink
              href="/carrusel"
              titulo="Carrusel"
              parrafo="Configura las opciones y comienza a mostrar tus palabras "
            />
            <TarjetasLink
              href="/metodologias"
              titulo="Metodologías"
              parrafo="Accede al amplio catálogo de metodologías disponibles"
            />
          </div>
        </main>
      </Layout>
      <style>{`
          .title{
            margin-bottom:60px;
            color:#247c8c;
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
          }
       
       `}</style>
    </>
  );
};

export default Home;

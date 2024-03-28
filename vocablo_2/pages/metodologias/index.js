import Layout from "../../componentes/layouts/Layout";
import Link from "next/link";
import TarjetasLink from "../../componentes/compartidos/TarjetasLink";
import styles from "../../styles/Home.module.css";

const Home = () => {
  return (
    <>
      <Layout title="metodologías" className="container">
        <div className="imgvocablo">
          <Link href={"/"}>
            <a>
              <img alt="Logo vocablo" src="/logo_vocablo_700.png" width="200" />
            </a>
          </Link>
        </div>
        <main className={styles.main}>
          <h3 className="title">Selección de Metodologías:</h3>
          <div className={styles.grid}>
            <TarjetasLink
              href="/metodologias/doman"
              titulo="Método Doman"
              parrafo="Relaciona palabras con sonidos, objetos e imágenes"
            />
            <TarjetasLink
              href="/metodologias/alfabetico"
              titulo="Método Alfabético"
              parrafo="Estamos trabajando en ello. Proximamente podrás acceder a los recursos"
              anularEnlace
            />
            <TarjetasLink
              href="/metodologias/fonetico"
              titulo="Método Fonético"
              parrafo="Estamos trabajando en ello. Proximamente podrás acceder a los recursos"
              anularEnlace
            />
            <TarjetasLink
              href="/metodologias/fenicio"
              titulo="Palabras Completas"
              parrafo="Estamos trabajando en ello. Proximamente podrás acceder a los recursos"
              anularEnlace
            />
            <TarjetasLink
              href="/metodologias/fenicio"
              titulo="Método Global"
              parrafo="Estamos trabajando en ello. Proximamente podrás acceder a los recursos"
              anularEnlace
            />
            <TarjetasLink
              href="/metodologias/fenicio"
              titulo="Página Error"
              parrafo="Página de prueba que muestra la página de error 404 personalizada."
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

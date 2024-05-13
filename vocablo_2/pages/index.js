import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import TarjetasLink from "../componentes/compartidos/TarjetasLink";

export default function Principal() {
  return (
    <>
      <Head>
        <title>vocablo</title>
        <meta name="description" content="enseñar a leer" />
        <link rel="icon" href="/icono_vocablo.svg" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <Image
            src="/logo_vocablo_1000.png"
            width={700}
            height={250}
            alt="logo vocablo"
            priority={true}
          />
          <p className={styles.description}>
            La herramienta educativa profesional para enseñar a leer
          </p>
          <div className={styles.grid}>
            <TarjetasLink
              href="/loginAlumnos"
              titulo="Alumno"
              parrafo="Solicita tus credenciales a tu profesor para acceder a los recursos "
            />
            <TarjetasLink
              href="/signin"
              titulo="Docente"
              parrafo="Gestiona el seguimiento de tus alumnos y crea contextos de aprendizaje"
            />
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://github.com/EzequielLara"
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none text-center text-dark d-none d-sm-block"
          >
            - Create by EzequielLara -
          </a>
          <a
            href="https://www.canva.com/design/DAFZWQEOF6Y/0W38RhZ8xtuax-4XEGE0_A/view?utm_content=DAFZWQEOF6Y&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink "
            className="text-decoration-none text-dark"
            target="_blank"
            rel="noreferrer"
          >
            <span className="vocablo">¿Qué es vocablo?</span>
          </a>
          <a
            href="https://github.com/EzequielLara/Proyecto-Daw"
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none text-dark"
          >
            <span className="p-2">¿Quieres participar?</span>
            <Image
              src="/github-mark/github-mark.svg"
              width={30}
              height={30}
              alt="logo github"
            />
          </a>
        </footer>
      </div>
      <style>{`
          .vocablo{
            color: #247c8c;
          }
      `}</style>
    </>
  );
}

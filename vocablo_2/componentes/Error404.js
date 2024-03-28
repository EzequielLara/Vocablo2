import { useRouter } from "next/router";
import Head from "next/head";

const Error404 = () => {
  const route = useRouter();

  return (
    <>
      <Head>
        <title>vocablo | error 404</title>
        <meta name="description" content="enseñar a leer" />
        <link rel="icon" href="/icono_vocablo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <div className="fof">
          <span>Error</span> 4
          <button onClick={() => route.back()}>
            <img
              alt="Icono vocablo"
              src="/icono_vocablo.svg"
              width="100"
              className="m-2"
            />
          </button>
          4
        </div>
        <small>
          Uuups! El recurso que busca no se encuentra en nuestros servidores
        </small>
      </main>
      <style jsx>{`
        main {
          /* display: flex; */
          margin: auto;
          font-family: "Fredoka One", cursive;
          height: 50vh;
          margin-top: 15%;
          width: 100%;
          color: grey;
          align-items: center;
          text-align: center;
          min-width: 600px;
        }
        span {
          font-family: "Fredoka One", cursive;
          color: #247c8c;
          font-weight: bold;
          text-align: center;
        }

        h1 {
          margin: auto;
          font-size: 3em;
        }
        button {
          border: none;
          background-color: transparent;
        }
        .fof {
          font-family: "Fredoka One", cursive;
          color: #64cca4;
          font-weight: bold;
          font-size: 100px;
        }
        @media (max-width: 600px) {
          main {
            width: 100%;
            min-width: 5px;
            max-width: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default Error404;

import styles from "../../styles/Home.module.css";
import Link from "next/link";

//Cards de la página index

const TarjetasLink = ({ href, titulo, parrafo, anularEnlace }) => {
  return (
    <Link href={href}>
      <a className={anularEnlace ? styles.anular : styles.card}>
        <h2>{titulo} &rarr;</h2>
        <p>{parrafo}</p>
      </a>
    </Link>
  );
};

export default TarjetasLink;

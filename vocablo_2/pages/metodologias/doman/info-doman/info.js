import Link from "next/link";
import { useState, useEffect } from "react";
import LayoutMainContent from "../../../../componentes/layouts/LayoutMainContent";

const Info = () => {
  const [loadvideo, setLoadvideo] = useState(false);

  useEffect(() => {
    setLoadvideo(true);
  }, []);
  return (
    <>
      <LayoutMainContent title="info-doman" content="método doman">
        <div className="container m-2">
          <div className="row">
            <div className=" col-3 lateralIzquierdo position-fixed">
              <Link href={"/"}>
                <a>
                  <img
                    alt="Logo vocablo"
                    src="/logo_vocablo_700.png"
                    width="200"
                    className="m-2"
                  />
                </a>
              </Link>
              <nav className="navegador">
                <ul>
                  <li className="listado">
                    <a href="#localizador">
                      <h6>¿En qué consiste el método Doman? </h6>
                    </a>
                  </li>
                  <li className="listado">
                    <a href="#localizador2">
                      <h6>Metodología</h6>
                    </a>
                  </li>
                  <li className="listado">
                    <a href="#localizador3">
                      <h6>Primera fase: palabras sueltas</h6>
                    </a>
                  </li>
                  <li className="listado">
                    <a href="#localizador4">
                      <h6>Segunda fase: parejas de palabras</h6>
                    </a>
                  </li>
                  <li className="listado">
                    <a href="#localizador5">
                      <h6>Tercera fase: parejas de palabras</h6>
                    </a>
                  </li>
                  <li className="listado">
                    <a href="#localizador6">
                      <h6>Cuarta fase: parejas de palabras</h6>
                    </a>
                  </li>
                  <li className="listado">
                    <a href="#localizador7">
                      <h6>Quinta fase: parejas de palabras</h6>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-sm lateralDerecho">
              <header>
                <h1 className="text-justify">Método Doman</h1>
              </header>
              <a name="localizador"></a>
              <h3>¿En qué consiste el método Doman?</h3>
              <p className="text-justify">
                {" "}
                El método Doman está diseñado para que el padre o la madre lo
                practique con su bebé, adaptándolo a las características y
                necesidades del niño, de manera que le resulte fácil y, sobre
                todo, divertido. No se trata de algo rígido, sino flexible, que
                admite modificaciones. Básicamente se trata de mostrar al niño
                series de cinco tarjetas con palabras, escritas con letras
                grandes y que correspondan a una misma categoría (por ejemplo:
                partes del cuerpo humano, colores, animales…), de forma rápida,
                tres veces al día.
              </p>
              <p className="text-justify">
                Debe hacerse como si fuera un juego, y recitar al niño cada
                palabra con entusiasmo, en voz alta y clara; poco a poco se irán
                añadiendo nuevas categorías (con sus cinco palabras
                correspondientes). En otras fases, y también escritas con letras
                grandes pero que van disminuyendo algo de tamaño, se enseñan al
                niño tarjetas con dos palabras, frases cortas y sencillas,
                frases un poco más largas y, finalmente cuentos que le resulten
                interesantes (una sola oración en cada página y con el texto
                separado de las ilustraciones).
              </p>
              <p className="text-justify">
                Glenn Doman justifica su metodología explicando el proceso
                mental que tiene lugar cuando el niño lee sus primeras palabras.
                Afirma que un bebé puede aprender a leer de la misma forma que
                aprende a hablar, siguiendo el mismo proceso. Una palabra
                escuchada, sigue los mismos impulsos electroquímicos hasta
                llegar al cerebro que una palabra percibida a través de la
                vista. Por lo tanto, según el autor, un bebé utiliza el mismo
                esfuerzo para aprender a hablar que para aprender a leer de
                forma global, siendo posible realizar estos aprendizajes de
                forma simultanea. Así, Doman afirma que “aprender a leer es tan
                fácil como aprender a hablar”. El autor explica el proceso de la
                lectura global según el funcionamiento de los hemisferios
                cerebrales. El hemisferio izquierdo se ocupa del lenguaje
                escrito, de habilidades numéricas, del razonamiento y de las
                habilidades científicas. El hemisferio derecho se ocupa de la
                perspicacia, del sentido artístico, de la imaginación, de la
                percepción tridimensional y del sentido musical.
              </p>
              {loadvideo ? (
                <iframe
                  className="mx-auto d-block mt-5 mb-5"
                  loading="lazy"
                  title="YouTube video player"
                  src="https://www.youtube.com/embed/y5cANfwg0hM"
                  width="90%"
                  height="400"
                ></iframe>
              ) : (
                <>
                  <small className="pb-5">Cargando Video...</small>
                </>
              )}
              <p className="text-justify">
                Al leer de forma global, estamos utilizando los dos hemisferios,
                percibimos la palabra como un todo, sin distinguir las letras,
                sino el dibujo que la conforma. La palabra entra por los ojos
                como una foto que es procesada y almacenada. Será después cuando
                el niño descubra las reglas que rigen el lenguajes escrito, al
                igual que descubre las reglas que rigen el lenguaje
                hablado&nbsp; y, por ejemplo,&nbsp; conjuga verbos nunca oídos
                (incluso regulariza verbos irregulares, lo cual nunca ha oído
                del adulto). Del mismo modo, el niño irá descubriendo como se
                combinan las letras para dar lugar a un mismo sonido, como
                coinciden en unas palabras y en otras, y en última instancia,
                como se descodifica el “código” del lenguaje escrito.
              </p>
              <a name="localizador2"></a>
              <h3>Metodología</h3>
              <p className="text-justify">
                {" "}
                Su metodología de lectura se basa en mostrar al niño pequeño
                tarjetas con palabras, de forma rápida, tres veces al día,
                organizadas en categorías y de cinco en cinco.
              </p>
              <p className="text-justify">
                Pero, veamos como lo hace paso a paso. En primer lugar las
                características de las tarjetas.
              </p>
              <ul>
                <li>
                  las tarjetas serán blancas, de formas alargadas y más grandes
                  conforme más pequeño sea el niño, siendo el tamaño ideal para
                  recién nacidos de 15×60 pasando a 10×60 cuando el niño crece y
                  aumenta su agudeza
                </li>
                <li>
                  Las letras serán también grandes, 12.5cm de altos para recién
                  nacidos y 7.5 para más mayores, y la tipología será de
                  imprenta, no
                </li>
                <li>Se dejará 1.35cm de</li>
                <li>
                  Las palabras serán rojas, porque llaman más la atención de los
                  niños y las perciben
                </li>
              </ul>
              <p className="text-justify">
                Las tarjetas se organizarán en categorías, para que el niño vaya
                estableciendo relaciones. Así, apunta como posibles
                categorías:-&nbsp;&nbsp; &nbsp;El bebé y su familia
              </p>
              <ul>
                <li className="text-justify">Vocabulario del cuerpo.</li>
                <li className="text-justify">Familia.</li>
                <li className="text-justify">Objetos familiares.</li>
                <li className="text-justify">Animales.</li>
                <li className="text-justify">Juguetes.</li>
                <li className="text-justify">Acciones.</li>
              </ul>
              <h5 className="text-justify">
                <strong>El aprendizaje tendrá cinco fases:</strong>
              </h5>
              <ul className="text-justify">
                <li>Primera fase: palabras</li>
                <li>Segunda fase: Parejas de</li>
                <li>Tercera fase: Oraciones sencillas</li>
                <li>Cuarta fase:Frases</li>
                <li>Quinta fase: Cuentos.</li>
              </ul>
              <a name="localizador3"></a>
              <h3 className="text-justify">
                Primera fase: palabras sueltas
              </h3>{" "}
              <p className="text-justify">
                En la primera fase se mostraran palabras solas, en primer lugar
                sustantivos, organizados en categorías, siguiendo la siguiente
                sucesión:
              </p>
              <ul className="text-justify">
                <li>1º día: cinco palabras de una categoría.</li>
                <li>
                  2º día: las cinco palabras de la primera categoría más cinco
                  palabras más.
                </li>
                <li>
                  3º día: las diez palabras de la primera y segunda categoría,
                  más cinco palabras más.
                </li>
                <li>
                  4º día: las quince palabras de la 1º, 2º, 3º categoría más
                  cinco palabras más.
                </li>
                <li>
                  5º día: las veinte palabras de la 1º, 2º, 3º y 4º categoría y
                  cinco palabras más.
                </li>
              </ul>
              <p className="text-justify">
                A partir del quinto día, (cinco días = una semana para Doman),
                pasaremos a ir quitando una categoría al introducir otra nueva,
                de tal manera, que nunca pasemos de las 25 tarjetas por día (las
                palabras retiradas serán utilizadas de nuevo en la siguiente
                fase, pero nunca más en ésta, para evitar que el niño se
                aburra). Las categorías se pasarán por separado (nunca las 25
                tarjetas juntas, sino de cinco en cinco, respetando las
                categorías), y separando las sesiones entre 15 y 30 minutos. Se
                pasarán las tarjetas lo más rápido posible, un segundo por
                tarjeta.
              </p>
              <p className="text-justify">
                Es muy importante la motivación y entusiasmo que se muestre en
                el proceso, ya que si nosotros lo pasamos bien, en niño también
                lo hará. Así mismo, el niño tiene que estar tranquilo,
                expectante, deseando ver las tarjetas. Esto lo conseguiremos con
                motivación y terminando la sesión siempre justo antes que el
                niño quiera hacerlo, dejándolo siempre con ganas. Hay que mirar
                al niño mientras se le dice la palabra, y hacerlo de forma lo
                suficientemente alta y clara y con mucho entusiasmo. Cada vez
                que pasemos una categoría de parejas, las barajaremos entre sí,
                para que nunca sigan el mismo orden. Así mismo, procuraremos que
                dos palabras sucesivas no empiecen por la misma letra.&nbsp; Al
                final de cada sesión recompensaremos al niño con muchos besos y
                abrazos (para Doman el componente afectivo es esencial, y el
                éxito del aprendizaje estará relacionado en gran medida con
                éste).
              </p>
              <a name="localizador4"></a>
              <h3 className="text-justify">
                Segunda fase: parejas de palabras.
              </h3>{" "}
              <p className="text-justify">
                Sería el paso intermedio ente las palabras sueltas y las frases.
                Tendrá lugar cuando el niño haya pasado ya unas 150 palabras
                aisladas. En esta fase se empiezan a formar pares de palabras.
                Así mismo, puede empezar a utilizarse tarjetas de colores para
                los colores en sí: tarjeta roja para el rojo, azul para el
                azul…Los primeros juegos de palabras podrían ser: ojos azules,
                uvas violetas…
              </p>
              <p className="text-justify">
                Introduciremos dos juegos de palabras pares (cinco pares cada
                uno) a la semana, con los juegos de palabras sueltas.
              </p>
              <p className="text-justify">
                En esta segunda fase volveremos a utilizar las palabras de la
                fase primera, de tal manera que se presentarán uno o dos juegos
                de parejas de palabras, junto a las categorías de palabras
                sueltas. También se introducirán juegos de contrarios
                (grande-pequeño, corto-largo…) y palabras compuestas (sumo
                naranja, lápiz labios…)
              </p>
              <a name="localizador5"></a>
              <h3 className="text-justify">
                Tercera fase: oraciones sencillas
              </h3>
              <p className="text-justify">
                En esta fase se introducen los verbos en la oración (aunque
                también hemos trabajado con&nbsp; verbos en la fase de palabras
                sueltas). De tal manera que ahora hay nombre + está + acción
                (Ej.:&nbsp; mamá está saltando) Ahora las letras ya pueden ser
                más pequeñas, de 5cm de altura, y con las frases podemos hacer
                un libro, de unas diez páginas e ilustraciones, con un tamaño de
                45×20 y lo leeremos a niño dos o tres veces al día.
              </p>
              <a name="localizador6"></a>
              <h3 className="text-justify">Cuarta fase: frases.</h3>
              <p className="text-justify">
                En esta fase vuelve a disminuir el tamaño de las letras, 2.5cm,
                a aumentar el número de palabras y a pasar de tinta roja a tinta
                negra. Es el momento de incluir los artículos. En esta fase
                también podemos hacer libros con las características similares a
                los de la etapa anterior.
              </p>
              <a name="localizador7"></a>
              <h3 className="text-justify">Quinta fase: cuentos.</h3>
              <p className="text-justify">
                Es la hora de leer cuentos y la hora de elegir el cuento más
                idóneo. Los cuentos tendrán entre 50 y 100 palabras, teniendo
                una sola oración por página, con letra no inferior a 2
                centímetros y con el texto separado de las ilustraciones y
                precediéndolas. Los cuentos deben estar cerca de los intereses
                del&nbsp; niño, ser motivantes e introducir vocabulario nuevo.
                Leeremos el cuento dos o tres veces al día, con una velocidad y
                entonación normal.
              </p>
              <p className="text-justify">
                Por último, cuando el niño ya sabe leer, es el momento ideal
                para enseñarle el alfabeto, si no lo ha aprendido ya durante el
                proceso de aprendizaje de lectura.
              </p>
              <p className="text-justify">
                Señalar en última instancia, que Doman subraya siempre la
                necesidad de adaptar el método a cada niño, a sus necesidades, a
                lo que a cada niño le vaya bien, por lo que no es un método
                estricto, sino abierto a modificaciones. El mejor método para un
                niño es aquel que le permita aprender más fácilmente, y por lo
                tanto hay un método rígido idóneo que sea el mismo para todos
                los niños.
              </p>
              <p>
                <strong>
                  Este contenido ha sido publicado originalmente por Orientación
                  Andújar (España) en la siguiente dirección:{" "}
                  <a
                    href="http://orientacionandujar.es"
                    target="_blank"
                    rel="noreferrer"
                  >
                    orientacionandujar.es
                  </a>
                </strong>
              </p>
              <p>
                <small>
                  *Contenido de ejemplo para el proyecto extraido de:{" "}
                  <a
                    href="https://webdelmaestrocmf.com/portal/resumen-del-metodo-de-lectura-doman-y-como-aplicarlo-pdf/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://webdelmaestrocmf.com/
                  </a>
                </small>
              </p>
              <div className="footer">
                <div className="float-start">
                  <Link href="../../../metodologias">
                    <a>
                      <h5>&larr; Ir a metodologías</h5>
                    </a>
                  </Link>
                </div>
                <div className="float-end">
                  <Link href="../recursos-doman/recursos">
                    <a>
                      <h5>Ir a recursos Doman &rarr; </h5>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutMainContent>
      <style>{`
        .lateralIzquierdo{
          border-right: 2px solid #eaeaea;
          max-width:22%;
          min-width:220px;
          height:100vh;
          
        }
        .lateralDerecho{
          margin-left: 40%;
          max-width:75ch;
          
        }
        .navegador{
          margin-top:10px;
          margin-left:0px;
        }
        .listado{
          display:block;
          padding-bottom:10px; 
        }
        .listado a{
          text-decoration: none;
          color: #247c8c;
        }
        .listado a:hover {
           color: #fbcf8b; 
           cursor: pointer; 
        }
        .text-justify{
          text-align: justify; 
        }
        h3{
          margin-bottom: 30px;
          margin-top:30px;
        }
        .footer{
          width:100%;
          margin-top:100px;
          margin-bottom:200px;
        }
        .footer a{
          text-decoration: none;
          color: #247c8c;
         
        }
        .footer a:hover {
           color: #fbcf8b;  
           cursor: pointer; 
        }
        header{
          color:#247c8c;
        }

        @media (max-width:590px){
          .lateralIzquierdo{
            display: none;
          }
          .lateralDerecho{
            margin:auto;
            text-align:center;
            max-width:40ch;
            min-width:25ch;
          }
          .footer{
            margin-top:50px;
          }
        }
      
      `}</style>
    </>
  );
};

export default Info;

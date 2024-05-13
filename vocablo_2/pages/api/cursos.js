import { MongoClient } from "mongodb";

function filtrarDatos(data) {
  const { password, ...datosFiltrados } = data;
  return datosFiltrados;
}

export default async function cursos(req, res) {
  const client = await MongoClient.connect(process.env.CONEXION_DB);
  client.connect((err) => {
    if (err) {
      console.log("Error al conectarse a la base de datos", err);
      return;
    }
    console.log("Conectado a la base de datos");
  });
  const db = client.db("vocablo");
  const collection = db.collection("usuarios");

  try {
    switch (req.method) {

      case "GET":
        const usuarios = await collection.findOne({
          email: req.query.email,
        });
        if (usuarios === undefined || usuarios === null) {
          res.status(500).json({ error: "No existe el usuario" });
        }
        const datosfiltrados = filtrarDatos(usuarios);
        res.status(200).json(datosfiltrados.cursos);
        break;

      case "POST":
        // Agregar el nuevo alumno al array de alumnos del usuario específico
        const cursoIntroducido = await collection.updateOne(
          { email: req.body.usuarioEmail },
          { $push: { cursos: req.body.nuevo } },
          (err) => {
            if (err) {
              res.status(500).send("Error al insertar el alumno");
            } else {
              res.status(200).json(cursoIntroducido);
            }
          }
        );
        res.status(200).json(cursoIntroducido)
        break;
      case "PUT":


        const index = req.body.usuarioCursos.findIndex(
          (elemento) => elemento.id === req.body.cursoNuevo.id
        );


        const resultadoActualizacion = await collection.updateOne(
          {
            email: req.body.usuarioEmail,
            cursos: req.body.usuarioCursos[index],
          },
          { $set: { "cursos.$": req.body.cursoNuevo } }
        );
        res.status(200).json(resultadoActualizacion);
        break;
      case "DELETE":
        try {
          const { curso, usuarioEmail } = req.query;
          const resultadoBorrar = await collection.updateOne(
            { email: usuarioEmail },
            { $pull: { cursos: { nombreCurso: curso } } }
          );
          if (resultadoBorrar.modifiedCount > 0) {
            res.status(200).json(resultadoBorrar);
          } else {
            res.status(404).json({ error: "No se encontró ningún curso para borrar" });
          }

        } catch (e) {
          res.status(500).json({ error: "no se pudo realizar el DELETE" });
        }
        break;
      default:
        res.status(400).send("Método HTTP no permitido");
        break;
    }
  } catch (error) {
    res.status(500).send("Error en la conexión con la base de datos");
  } finally {
    await client.close();
  }
}

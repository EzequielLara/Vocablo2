import { MongoClient } from "mongodb";

function filtrarDatos(data) {
  const { password, ...datosFiltrados } = data;
  return datosFiltrados;
}

export default async function alumnos(req, res) {
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
          res.status(404).json({ error: "No se ha recibido ningún usuario en el servidor" });
        }
        const datosfiltrados = filtrarDatos(usuarios);
        res.status(200).json(datosfiltrados);
        break;

      case "POST":
        const { nuevo, usuario } = req.body;
        // Agregar el nuevo alumno al array de alumnos del usuario específico
        const alumnoIntroducido = await collection.updateOne(
          { email: usuario.email },
          { $push: { alumnos: nuevo } },
        );
        if (alumnoIntroducido.modifiedCount === 1) {
          res.status(200).json(alumnoIntroducido);
        } else {
          res.status(404).send("Error al insertar el alumno");
        }
        break;
      case "PUT":

        const index = req.body.usuario.alumnos.findIndex(
          (elemento) => elemento.id === req.body.alumnoNuevo.id
        );

        const resultadoActualizacion = await collection.updateOne(
          {
            email: req.body.usuario.email,
            alumnos: req.body.usuario.alumnos[index],
          },
          { $set: { "alumnos.$": req.body.alumnoNuevo } }
        );

        res.status(200).json(resultadoActualizacion);
        break;
      case "DELETE":
        try {
          const resultadoBorrar = await collection.updateOne(
            { email: req.query.usuarioEmail },
            { $pull: { alumnos: { id: req.query.alumnoId } } }
          );
          res.status(200).json(resultadoBorrar);
        } catch (e) {
          res.status(300).json({ error: "no se pudo realizar el DELETE" });
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

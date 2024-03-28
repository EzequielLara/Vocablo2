import { MongoClient } from "mongodb";
import validarNombreYContrasena from "../../../shared/validaciones";
import { generarFecha } from "../../../shared/generarFecha";
import crypto from "crypto";

export default async function loginHandler(req, res) {
  const { email, username, loginAuth } = req.body;

  const hashPassword = (password) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    const hashedPassword = hash.digest("hex");

    return hashedPassword;
  };

  if (loginAuth == false || loginAuth == null || loginAuth == undefined) {
    const error = validarNombreYContrasena(username, req.body.password, email);
    if (error) {
      res.status(error.status).json({ error: error.mensaje });
    } else {
      const client = await MongoClient.connect(process.env.CONEXION_DB);
      try {
        const db = client.db("vocablo");
        const collection = db.collection("usuarios");
        switch (req.method) {
          case "POST":
            const { email, username, password } = req.body;
            const passwordhaseado = hashPassword(password);
            const usuarioExistente = await collection.findOne({ email });
            if (usuarioExistente) {
              res
                .status(400)
                .json({ error: "Ya existe un usuario con ese email" });
              return;
            }
            await collection.insertOne({
              fechaCreacion: generarFecha(),
              ultimoAcceso: new Date().toLocaleString(),
              email,
              username,
              password: passwordhaseado,
              loginAuth: false,
              cursos: [],
              alumnos: [],
            });
            res.status(200).json({ message: "Usuario creado correctamente" });
            break;
          default:
            res.status(405).json({ error: "Método HTTP no permitido" });
            break;
        }
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "Error en la conexión con la base de datos" });
      } finally {
        await client.close();
      }
    }
  } else {
    const client = await MongoClient.connect(process.env.CONEXION_DB);
    try {
      const db = client.db("vocablo");
      const collection = db.collection("usuarios");
      switch (req.method) {
        case "POST":
          const { email, username, loginAuth } = req.body;
          const usuarioExistente = await collection.findOne({ email });
          if (usuarioExistente) {
            res.status(200).json({ message: "Usuario encontrado" });
            break;
          }
          await collection.insertOne({
            fechaCreacion: generarFecha(),
            ultimoAcceso: generarFecha(),
            email,
            username,
            loginAuth: true,
            cursos: [],
            alumnos: [],
          });
          res.status(200).json({ message: "Usuario creado correctamente" });
          break;
        default:
          res.status(405).json({ error: "Método HTTP no permitido" });
          break;
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Error en la conexión con la base de datos" });
    } finally {
      await client.close();
    }
  }
}

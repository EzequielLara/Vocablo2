import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import crypto from "crypto";

export default async function loginalumnos(req, res) {
  const { email, password } = req.body;

  /* const hashPassword = (password) => {
     // Crear un hash SHA-256
     const hash = crypto.createHash("sha256");
 
     // Actualizar el hash con la contraseña
     hash.update(password);
 
     // Obtener el hash en formato hexadecimal
     const hashedPassword = hash.digest("hex");
 
     return hashedPassword;
   };
 
   const passwordhaseado = hashPassword(password);*/

  const client = await MongoClient.connect(process.env.CONEXION_DB);

  try {
    const db = client.db("vocablo");
    const collection = db.collection("usuarios");

    switch (req.method) {
      case "POST":

        const usuarioExistente = await collection.findOne({ 'alumnos.email': email });
        const alumnoExistente = usuarioExistente && usuarioExistente.alumnos.find(alumno => alumno.email === email);

        if (
          !usuarioExistente

        ) {
          return res.status(401).json({ error: "El alumno no existe" });
        }
        else if (
          //usuarioExistente.password !== passwordhaseado
          alumnoExistente.password !== password
        ) {
          return res.status(401).json({ error: "password incorrecto" });
        }
        else if (

          alumnoExistente.activado == false
        ) {
          return res.status(401).json({ error: "Contacta con tu profesor para activar la cuenta" });
        }

        else {

          console.log('alumno encontrado: ', alumnoExistente)
          const token = jwt.sign(
            {
              email: alumnoExistente.email,
              nombre: alumnoExistente.nombre,
              activado: alumnoExistente.activado,
              exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
            },
            process.env.SECRET_JWT
          );
          const serialized = serialize("tokenNameAlumno", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
          });

          res.setHeader("Set-Cookie", serialized);
          return res.status(200).json({ exito: "login satisfactorio" });
        }

      default:
        return res.status(405).json({ error: "Método HTTP no permitido" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error en la conexión con la base de datos" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

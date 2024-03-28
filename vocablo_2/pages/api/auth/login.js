import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import crypto from "crypto";

export default async function loginHandler(req, res) {
  const { email, password } = req.body;

  const hashPassword = (password) => {
    // Crear un hash SHA-256
    const hash = crypto.createHash("sha256");

    // Actualizar el hash con la contraseña
    hash.update(password);

    // Obtener el hash en formato hexadecimal
    const hashedPassword = hash.digest("hex");

    return hashedPassword;
  };

  const passwordhaseado = hashPassword(password);

  const client = await MongoClient.connect(process.env.CONEXION_DB);

  try {
    const db = client.db("vocablo");
    const collection = db.collection("usuarios");

    switch (req.method) {
      case "POST":
        const usuarioExistente = await collection.findOne({ email });

        if (
          !usuarioExistente ||
          usuarioExistente.password !== passwordhaseado
        ) {
          return res.status(401).json({ error: "email o password incorrecto" });
        } else {
          const token = jwt.sign(
            {
              email: usuarioExistente.email,
              username: usuarioExistente.username,
              exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
            },
            process.env.SECRET_JWT
          );
          const serialized = serialize("myTokenName", token, {
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

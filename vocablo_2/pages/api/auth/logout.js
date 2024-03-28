import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default function logout(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: "no token" });
  }
  try {
    verify(myTokenName, process.env.SECRET_JWT);
    const serialized = serialize("myTokenName", null, {
      //este tercer valor del metodo serialize no es obligatorio
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({ exito: "logout satisfactorio" });
  } catch {
    return res.status(401).json("no se ha podido realizar la operación");
  }
}

export default function validarNombreYContrasena(nombre, contrasena, email) {
  // Validar el campo de nombre
  if (nombre.length < 4) {
    return {
      status: 400,
      mensaje: "El nombre debe contener más de cuatro caracteres.",
    };
  }

  // Validar el campo de contraseña
  if (contrasena.length < 6) {
    return {
      status: 400,
      mensaje: "La contraseña debe contener al menos seis caracteres.",
    };
  }

  // Validar que la contraseña contenga al menos un dígito y un símbolo
  const digitos = /[0-9]/;
  const simbolos = /[$-/:-?{-~!"^_`\[\]]/;
  const arroba = /@.+/;

  if (!arroba.test(email)) {
    return {
      status: 400,
      mensaje:
        "El correo electrónico debe contener el símbolo '@' seguido de texto",
    };
  }

  if (!digitos.test(contrasena) || !simbolos.test(contrasena)) {
    return {
      status: 400,
      mensaje: "La contraseña debe contener al menos un dígito y un símbolo.",
    };
  }

  // Si ambos campos pasan las validaciones, retornamos null para indicar que son válidos
  return null;
}

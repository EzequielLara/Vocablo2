export const generarFecha = () => {
  const fecha = new Date();
  const parametrosFecha = { year: "numeric", month: "long", day: "2-digit" };
  const datoFecha = fecha.toLocaleDateString("es-ES", parametrosFecha);

  return datoFecha;
};

import style from "../../styles/ModalAlumnos.module.css";

const ModalRecurso = ({ cambiarModal, recursoSeleccionado }) => {
  return (
    <>
      <div className={style.modal}>
        <div className={style.cerrar_modal}>
          <img src="/cerrar.svg" alt="cerrar modal" onClick={cambiarModal} />
        </div>
        <div className={`${style.formulario} ${style.animar}`}>
          <legend className="my-5">
            Simulación de redirección al {recursoSeleccionado}
          </legend>
        </div>
      </div>
    </>
  );
};

export default ModalRecurso;

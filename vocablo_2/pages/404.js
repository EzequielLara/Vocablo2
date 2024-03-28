import Error404 from "../componentes/Error404";
import LayoutMainContent from "../componentes/layouts/LayoutMainContent";

const Error = () => {
  return (
    <LayoutMainContent
      title="página no encontrada"
      content="página de error 404"
    >
      <Error404></Error404>
    </LayoutMainContent>
  );
};

export default Error;

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function Transicion() {
  const element = useRouter([
    {
      path: "/autenticacion",
      element: <Autenticacion />,
    },
  ]);

  const pagina = useRouter();

  if (!element) return null;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {React.cloneElement(element, { key: pagina.pathname })}
    </AnimatePresence>
  );
}

import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

if (import.meta.env.PROD) {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      updateSW(true);
    },
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      // Procura atualizacao ao abrir e sempre que a aba volta ao foco.
      registration.update();
      const checkOnFocus = () => {
        if (document.visibilityState === "visible") registration.update();
      };
      document.addEventListener("visibilitychange", checkOnFocus);
      window.addEventListener("focus", checkOnFocus);
    },
  });

  // Na primeira visita a pagina ainda nao tem controlador. Quando o service
  // worker recem instalado assume o controle, isso nao e uma atualizacao e nao
  // deve recarregar a pagina.
  const hadControllerAtStartup = Boolean(navigator.serviceWorker?.controller);
  let reloaded = false;
  navigator.serviceWorker?.addEventListener("controllerchange", () => {
    if (!hadControllerAtStartup || reloaded) return;
    reloaded = true;
    window.location.reload();
  });
}

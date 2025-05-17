// src/hooks/useServerStatus.js
import { useEffect, useState } from "react";

export default function useServerStatus() {
  const [estadoServidor, setEstadoServidor] = useState("cargando");

  useEffect(() => {
    const controller = new AbortController();

    const comprobarServidor = async () => {
      try {
        const res = await fetch(
          import.meta.env.PROD
            ? "https://fes-backend.onrender.com/api/despierta"
            : "http://localhost:8080/api/despierta",
          { signal: controller.signal }
        );
        setEstadoServidor(res.ok ? "activo" : "inactivo");
      } catch (error) {
        if (error.name !== "AbortError") {
          setEstadoServidor("inactivo");
        }
      }
    };

    const timeoutId = setTimeout(() => {
      controller.abort();
      setEstadoServidor("inactivo");
    }, 5000);

    comprobarServidor();

    const intervalo = setInterval(() => {
      if (estadoServidor === "inactivo") {
        comprobarServidor();
      }
    }, 30000);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
      clearInterval(intervalo);
    };
  }, [estadoServidor]);

  return estadoServidor;
}

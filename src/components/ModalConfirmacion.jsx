import { useEffect } from "react";

export default function ModalConfirmacion({
  visible,
  usuario,
  cambios,
  onConfirmar,
  onCancelar,
}) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCancelar();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancelar]);

  if (!visible || !usuario || !cambios) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onCancelar}
    >
      <div
        className="bg-white rounded-lg p-6 w-[400px] shadow-xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-blue-900">
          Confirmar cambios para <span className="text-black">{usuario}</span>
        </h2>

        <ul className="mb-4 text-sm text-gray-700 list-disc pl-5">
          {cambios.userType && <li><strong>Tipo:</strong> {cambios.userType}</li>}
          {cambios.rango && <li><strong>Rango:</strong> {cambios.rango}</li>}
        </ul>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancelar}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

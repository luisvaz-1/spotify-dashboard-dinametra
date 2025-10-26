import React from "react";

const Loader: React.FC = () => (
  <div role="status" aria-live="polite" className="p-6 text-center">
    <span className="animate-spin mr-2">⏳</span> Cargando datos de Spotify...
  </div>
);

export default Loader;
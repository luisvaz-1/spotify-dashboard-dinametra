import React, { useState } from "react";
import CountrySelector from "../components/CountrySelector";
import AlbumsBarChart from "../components/AlbumsBarChart";
import GenresPieChart from "../components/GenresPieChart";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import useAlbums from "../hooks/useAlbums";
import useGenres from "../hooks/useGenres";

const App: React.FC = () => {
  const [country, setCountry] = useState("US");
  const { albums, loading: loadingAlbums, error: errorAlbums } = useAlbums(country);
  const { genres, loading: loadingGenres } = useGenres(country);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Spotify Dashboard Dinametra</h1>
        <p className="text-gray-700 mb-2">
          Visualización interactiva de nuevos lanzamientos y géneros musicales
        </p>
        <CountrySelector value={country} onChange={setCountry} />
      </header>
      {errorAlbums && <ErrorMessage message={errorAlbums} />}
      {loadingAlbums ? <Loader /> : <AlbumsBarChart albums={albums} />}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Distribución de géneros musicales</h2>
        {loadingGenres ? <Loader /> : <GenresPieChart genres={genres} />}
      </section>
      <footer className="text-center text-gray-400 mt-12 text-sm">
        Dashboard de prueba &copy; {new Date().getFullYear()} | Datos de Spotify | Accesible y responsivo
      </footer>
    </div>
  );
};

export default App;
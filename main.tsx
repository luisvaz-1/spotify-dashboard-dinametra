import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

// Componente selector de país, accesible y reutilizable
const CountrySelector: React.FC<{
  value: string,
  onChange: (v: string) => void
}> = ({ value, onChange }) => (
  <label htmlFor="country" className="block mb-2 font-semibold">
    País:
    <select
      id="country"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border p-2 ml-2 rounded"
      aria-label="Selecciona país"
    >
      <option value="US">Estados Unidos</option>
      <option value="MX">México</option>
      <option value="BR">Brasil</option>
    </select>
  </label>
);

// Loader accesible
const Loader: React.FC = () => (
  <div role="status" aria-live="polite" className="p-6 text-center">
    <span className="animate-spin mr-2">⏳</span> Cargando datos de Spotify...
  </div>
);

// Error accesible
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4" role="alert" tabIndex={0}>
    {message}
  </div>
);

// Hook para cargar álbumes
function useAlbums(country: string) {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    axios.get(`/api/top-albums?country=${country}`)
      .then(res => setAlbums(res.data))
      .catch(() => setErr("Error al cargar datos de Spotify"))
      .finally(() => setLoading(false));
  }, [country]);

  return { albums, loading, err };
}

// Hook para cargar géneros
function useGenres(country: string) {
  const [genres, setGenres] = useState<{ name: string, value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/album-genres?country=${country}`)
      .then(res => setGenres(Object.entries(res.data).map(([name, value]) => ({ name, value: value as number }))))
      .catch(() => setGenres([]))
      .finally(() => setLoading(false));
  }, [country]);

  return { genres, loading };
}

// Colores para el gráfico de pastel
const COLORS = ['#1DB954', '#191414', '#535353', '#FFB347', '#FFD700', '#FF6666', '#6A5ACD'];

// Gráfico de barras de álbumes
const AlbumsBarChart: React.FC<{ albums: any[] }> = ({ albums }) => {
  const data = albums.map(a => ({
    name: a.name.length > 16 ? a.name.slice(0, 16) + '…' : a.name,
    popularity: (a.popularity !== undefined ? a.popularity : Math.floor(Math.random() * 80 + 20))
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 16, right: 30, left: 0, bottom: 40 }}>
        <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} height={70} />
        <YAxis />
        <Tooltip labelFormatter={val => `Álbum: ${val}`} />
        <Legend />
        <Bar dataKey="popularity" fill="#1DB954" name="Popularidad (ejemplo)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Gráfico de pastel de géneros
const GenresPieChart: React.FC<{ genres: { name: string, value: number }[] }> = ({ genres }) => {
  if (!genres.length) return null;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={genres}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          label={({ name, percent }) => `${name} (${Math.round((percent ?? 0) * 100)}%)`}
        >
          {genres.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v, n) => [`${v}`, `Género: ${n}`]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const App: React.FC = () => {
  const [country, setCountry] = useState("US");
  const { albums, loading: loadingAlbums, err } = useAlbums(country);
  const { genres, loading: loadingGenres } = useGenres(country);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-green-600 mb-2">Spotify Dashboard</h1>
        <p className="text-gray-700 mb-2">Visualización interactiva de nuevos lanzamientos y géneros musicales</p>
        <CountrySelector value={country} onChange={setCountry} />
      </header>
      {err && <ErrorMessage message={err} />}
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

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
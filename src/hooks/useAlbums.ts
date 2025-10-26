import { useEffect, useState } from "react";
import axios from "axios";

export default function useAlbums(country: string) {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`/api/top-albums?country=${country}`)
      .then((res) => setAlbums(res.data))
      .catch(() => setError("Error al cargar datos de Spotify"))
      .finally(() => setLoading(false));
  }, [country]);

  return { albums, loading, error };
}
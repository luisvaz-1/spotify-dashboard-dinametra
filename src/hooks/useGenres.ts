import { useEffect, useState } from "react";
import axios from "axios";

export default function useGenres(country: string) {
  const [genres, setGenres] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/album-genres?country=${country}`)
      .then((res) =>
        setGenres(
          Object.entries(res.data).map(([name, value]) => ({
            name,
            value: value as number,
          }))
        )
      )
      .catch(() => setGenres([]))
      .finally(() => setLoading(false));
  }, [country]);

  return { genres, loading };
}
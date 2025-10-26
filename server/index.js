import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessToken = null;
let tokenExpiresAt = 0;

// Obtiene y cachea el token de acceso de Spotify
async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiresAt) return accessToken;
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  try {
    const res = await axios.post("https://accounts.spotify.com/api/token", params, {
      headers: {
        Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    accessToken = res.data.access_token;
    tokenExpiresAt = Date.now() + (res.data.expires_in - 60) * 1000;
    return accessToken;
  } catch (err) {
    console.error("Error al obtener el token de Spotify", err?.response?.data || err.message);
    throw new Error("No se pudo obtener token de Spotify");
  }
}

// Endpoint: nuevos lanzamientos de álbumes por país
app.get("/api/top-albums", async (req, res) => {
  const { country = "US" } = req.query;
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/browse/new-releases?country=${country}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.json(response.data.albums.items);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener datos de Spotify", details: err.message });
  }
});

// Endpoint: distribución de géneros usando los artistas principales de los álbumes
app.get("/api/album-genres", async (req, res) => {
  const { country = "US" } = req.query;
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/browse/new-releases?country=${country}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const genres = {};
    const albums = response.data.albums.items;
    for (const album of albums) {
      if (album.artists?.length) {
        const artistId = album.artists[0].id;
        const artistRes = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        artistRes.data.genres.forEach((g) => {
          genres[g] = (genres[g] || 0) + 1;
        });
      }
    }
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener géneros de Spotify", details: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Servidor escuchando en puerto", PORT));
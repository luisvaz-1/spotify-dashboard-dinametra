import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Album = {
  name: string;
  popularity?: number;
};

type Props = {
  albums: Album[];
};

const AlbumsBarChart: React.FC<Props> = ({ albums }) => {
  const data = albums.map((a) => ({
    name: a.name.length > 16 ? a.name.slice(0, 16) + "…" : a.name,
    popularity: a.popularity !== undefined ? a.popularity : Math.floor(Math.random() * 80 + 20),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 16, right: 30, left: 0, bottom: 40 }}>
        <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} height={70} />
        <YAxis />
        <Tooltip labelFormatter={(val) => `Álbum: ${val}`} />
        <Legend />
        <Bar dataKey="popularity" fill="#1DB954" name="Popularidad (ejemplo)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AlbumsBarChart;
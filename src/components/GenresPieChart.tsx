import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#1DB954", "#191414", "#535353", "#FFB347", "#FFD700", "#FF6666", "#6A5ACD"];

type Props = {
  genres: { name: string; value: number }[];
};

const GenresPieChart: React.FC<Props> = ({ genres }) => {
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

export default GenresPieChart;
import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const CountrySelector: React.FC<Props> = ({ value, onChange }) => (
  <label htmlFor="country" className="block mb-2 font-semibold">
    País:
    <select
      id="country"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 ml-2 rounded"
      aria-label="Selecciona país"
    >
      <option value="US">Estados Unidos</option>
      <option value="MX">México</option>
      <option value="BR">Brasil</option>
    </select>
  </label>
);

export default CountrySelector;
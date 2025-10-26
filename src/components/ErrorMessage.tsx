import React from "react";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4" role="alert" tabIndex={0}>
    {message}
  </div>
);

export default ErrorMessage;
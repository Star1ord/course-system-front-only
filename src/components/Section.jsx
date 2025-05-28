import React from 'react';

export default function Section({ title, children }) {
  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      <h2 className="text-maroon text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

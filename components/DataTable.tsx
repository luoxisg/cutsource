import React from 'react';
import { Table } from '../types';

const DataTable: React.FC<Table> = ({ headers, rows }) => {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-300">
        <thead className="bg-gray-700/50 text-xs text-gray-300 uppercase">
          <tr>
            {headers.map(header => (
              <th key={header} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/60">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
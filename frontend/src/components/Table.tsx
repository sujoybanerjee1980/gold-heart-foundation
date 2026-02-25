import React from 'react';

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ columns, data, actions }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
              No data available
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              {actions && <td>{actions(row)}</td>}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;

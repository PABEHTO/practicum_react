import React, { useState } from "react";
import Filter from './Filter.js';

const Table = ({ data, amountRows, fullData, setFilteredData, usePagination}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilter = (filteredData) => {
    setFilteredData(filteredData);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(data.length / amountRows);

  
  const displayData = usePagination ? data.slice((currentPage - 1) * amountRows, currentPage * amountRows) : data;

  return (
    <div className="table-container">
      <Filter filtering={handleFilter} fullData={fullData} />
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Страна</th>
            <th>Высота</th>
            <th>Год</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((item, index) => (
            <tr key={index}>
              <td>{item.Название}</td>
              <td>{item.Страна}</td>
              <td>{item.Высота}</td>
              <td>{item.Год}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {usePagination && totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i}
              style={{
                cursor: "pointer",
                fontWeight: currentPage === i + 1 ? "bold" : "normal",
                marginRight: "8px",
              }}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;
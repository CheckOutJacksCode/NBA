import React, { useState } from "react";

const TableHead = ({ columns, handleSorting, smallHeaders }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const handleSortingChange = (accessor) => {
        const sortOrder =
         accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };
    if (smallHeaders) {
        console.log(smallHeaders)
        return (
            <thead className="smallHeaders">
             <tr>
              {columns.map(({ label, accessor }) => {
               return (
                <th key={accessor} onClick={() => handleSortingChange(accessor)}>
                 {label}
                </th>
               );
              })}
             </tr>
            </thead>
        );
    } else {
        return (
            <thead className="regularHeaders">
             <tr>
              {columns.map(({ label, accessor }) => {
               return (
                <th key={accessor} onClick={() => handleSortingChange(accessor)}>
                 {label}
                </th>
               );
              })}
             </tr>
            </thead>
        );
    }
};
      
export default TableHead;
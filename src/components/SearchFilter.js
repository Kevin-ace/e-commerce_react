import React from "react";

const SearchFilter = ({ setSearch, setCategory }) => {
  return (
    <div style={{ marginBottom: "20px", color: "#fff" }}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #00b3ff",
          background: "transparent",
          color: "#fff",
          fontSize: "16px",
        }}
      />
      <select
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px",
          background: "transparent",
          color: "#fff",
          border: "1px solid #00b3ff",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
      </select>
    </div>
  );
};

export default SearchFilter;

// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  marginRight: "10px",
  textDecoration: "none",
};

function NavBar() {
  return (
    <nav
      style={{
        padding: "10px",
        borderBottom: "1px solid #ccc",
        marginBottom: "20px",
      }}
    >
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/add" style={linkStyle}>
        Add Product
      </Link>
      <Link to="/update" style={linkStyle}>
        Update Product
      </Link>
      <Link to="/delete" style={linkStyle}>
        Delete Product
      </Link>
      <Link to="/season-summary" style={linkStyle}>
        Season Summary
      </Link>
      <Link to="/units-filter" style={linkStyle}>
        Units Sold Filter
      </Link>
      <Link to="/rating-filter" style={linkStyle}>
        Rating Filter
      </Link>
    </nav>
  );
}

export default NavBar;

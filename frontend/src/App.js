// src/App.js
//import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct";
import SeasonSummary from "./components/SeasonSummary";
import UnitsSoldFilter from "./components/UnitsSoldFilter";
import RatingFilter from "./components/RatingFilter";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Fashion Shop Dashboard</h2>
                <p>Select an option from the menu above.</p>
              </div>
            }
          />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update" element={<UpdateProduct />} />
          <Route path="/delete" element={<DeleteProduct />} />
          <Route path="/season-summary" element={<SeasonSummary />} />
          <Route path="/units-filter" element={<UnitsSoldFilter />} />
          <Route path="/rating-filter" element={<RatingFilter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home"; // Import your Home component

function App() {
  return (
    <Router>
      <Routes>
        {/* The Home component will handle routing for the real estate details */}
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

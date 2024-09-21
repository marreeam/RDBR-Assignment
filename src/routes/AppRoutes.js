import React from "react";
import { Route, Routes } from "react-router-dom";
import RealEstateDetail from "../pages/ListingPage"; // Assuming this is your listing page

import AddListingForm from "../components/searchBar/AddListing/AddListingForm"; // Add listing form
import Home from "../pages/home";

const AppRoutes = ({ filteredRealEstate }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route path="/real-estate/:id" element={<RealEstateDetail />} />
      <Route path="/AddListing" element={<AddListingForm />} />
    </Routes>
  );
};

export default AppRoutes;

import React,{useContext}from "react";
import { Route, Routes } from "react-router-dom";
import RealEstateDetail from "../pages/ListingPage"; // Assuming this is your listing page
import SearchBar from "../components/searchBar/searchBar";
import AppliedFilters from "../components/AppliedFilters/AppliedFilters";
import Card from "../components/Card/card";
import AddListingForm from "../components/searchBar/AddListing/AddListingForm"; // Add listing form
import { ThemeContext } from "../pages/home";
import Home from "../pages/home";

const AppRoutes = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={
       <Home/>}
      />
      <Route path="/real-estate/:id" element={<RealEstateDetail  />} />
      <Route path="/AddListing" element={<AddListingForm />} />
    </Routes>
  );
};

export default AppRoutes;

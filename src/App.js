import React, {  createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home"; 
import MainLayout from "./templates/MainLayout";
import AppRoutes from "./routes/AppRoutes";
import { useRealEstateState } from "./hooks/useRealEstate";

export const ThemeContext = createContext();

function App() {
  const {
    realEstate, setRealEstate, selectedRegion, setSelectedRegion, setMinSelectedPrice, setMaxSelectedPrice, setMinSelectedArea, setMaxSelectedArea, setBedrooms, bedrooms, selectedRegionNames, setSelectedRegionNames, minSelectedPrice, maxSelectedPrice, minPrice, maxPrice, setMaxPrice, setMinPrice, minSelectedArea, maxSelectedArea, minArea, setMinArea, maxArea, setMaxArea,setFilteredRealEstate,filteredRealEstate } = useRealEstateState();


  return (
      <Router>
         <ThemeContext.Provider value={{ realEstate, setRealEstate, selectedRegion, setSelectedRegion, setMinSelectedPrice, setMaxSelectedPrice, setMinSelectedArea, setMaxSelectedArea, setBedrooms, bedrooms, selectedRegionNames, setSelectedRegionNames, selectedRegion, minSelectedPrice, maxSelectedPrice, minPrice, maxPrice, setMaxPrice, setMinPrice, minSelectedArea, maxSelectedArea, minArea, setMinArea, maxArea, setMaxArea,setFilteredRealEstate,filteredRealEstate }}>
 
        <MainLayout  >
          <AppRoutes>

          </AppRoutes>
           

        </MainLayout>
        </ThemeContext.Provider>
      </Router>

  );
}

export default App;

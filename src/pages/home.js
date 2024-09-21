import React, {  createContext, useEffect,useContext } from "react";
import { useRealEstateState } from "../hooks/useRealEstate";
import {  useLocation } from "react-router-dom";
import MainLayout from "../templates/MainLayout";
import SearchBar from "../components/searchBar/searchBar";
import AppliedFilters from "../components/AppliedFilters/AppliedFilters";
import Card from "../components/Card/card";
import { ThemeContext } from '../App';


function Home() {
  const location = useLocation();
  const { realEstate, setRealEstate, selectedRegion, setSelectedRegion, setMinSelectedPrice, setMaxSelectedPrice, setMinSelectedArea, setMaxSelectedArea, setBedrooms, bedrooms, selectedRegionNames, setSelectedRegionNames, minSelectedPrice, maxSelectedPrice, minPrice, maxPrice, setMaxPrice, setMinPrice, minSelectedArea, maxSelectedArea, minArea, setMinArea, maxArea, setMaxArea,setFilteredRealEstate,filteredRealEstate} = useContext(ThemeContext);
  
  useEffect(() => {
    // Fetch real estate data on mount or when coming back from deletion
    fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
      headers: {
        'Authorization': 'Bearer 9d047c0d-30dc-4458-b641-f99e302e2835',
        'Accept': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRealEstate(data || []);
      })
      .catch((error) => console.error('Error fetching real estate data:', error));
  }, [location.pathname]); // Listen to the pathname and refetch when it changes to "/"

  useEffect(() => {
    const isFilterNotSet=!selectedRegion.length&&!minSelectedPrice&&!maxSelectedPrice&&!minSelectedArea&&!maxSelectedArea&&!bedrooms;
    if (Array.isArray(realEstate) && realEstate.length > 0) {
      const filtered = realEstate.filter((item) => {
        const matchesRegion =  selectedRegion?.includes(item.city?.region?.id);
        const matchesMinPrice =  item.price >= parseInt(minSelectedPrice?.replace(',', ''))&&item.price <=parseInt(minSelectedPrice?.replace(',', '')); // Handle min price
        const matchesMaxPrice =  item.price <= parseInt(maxSelectedPrice?.replace(',', ''))&& item.price >=parseInt(maxSelectedPrice?.replace(',', '')); // Handle max price
        const matchesMinArea =  item.area >= parseInt(minSelectedArea?.replace(',', ''))&&item.area <= parseInt(minSelectedArea?.replace(',', '')); // Handle min Area
        const matchesMaxArea =  item.area <= parseInt(maxSelectedArea?.replace(',', ''))&&item.area >= parseInt(maxSelectedArea?.replace(',', '')); // Handle max Area
        const matchesBedrooms =  item.bedrooms === Number(bedrooms);

        return matchesRegion || matchesMinPrice || matchesMaxPrice || matchesMinArea || matchesMaxArea || matchesBedrooms;
      });
      

      setFilteredRealEstate(isFilterNotSet?realEstate:filtered);
    } else {
      setFilteredRealEstate([]);  // Ensure filteredRealEstate is always an array
    }
  }, [realEstate, selectedRegion, minSelectedPrice, maxSelectedPrice, minSelectedArea, maxSelectedArea, bedrooms]);

  return (
   <>
      <SearchBar />
        <AppliedFilters />
        <div className=" relative top-[225px] left-[162px]">
        <Card  filteredRealEstate={filteredRealEstate} />
        </div>
      
</>
  );
}

export default Home;

import React, { useState,createContext, useEffect } from "react";
import Header from "./components/Header/header";
import SearchBar from "./components/searchBar/searchBar";
import Card from "./components/Card/card";

export const ThemeContext = createContext();


function Home() {

const [realEstate, setRealEstate] = useState([]);  // Initialize as empty array
const [filteredRealEstate, setFilteredRealEstate] = useState([]);
const [selectedRegion, setSelectedRegion] = useState([]);
const [minSelectedPrice, setMinSelectedPrice] = useState(null);
const [maxSelectedPrice, setMaxSelectedPrice] = useState(null);
const [minSelectedArea, setMinSelectedArea] = useState(null);
const [maxSelectedArea, setMaxSelectedArea] = useState(null);
const [bedrooms, setBedrooms] = useState('');

useEffect(() => {
  fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
    headers: {
      'Authorization': 'Bearer 9d047c0d-30dc-4458-b641-f99e302e2835',
      'Accept': 'application/json'
    },
   
  })
    .then((response) => response.json())
    .then((data) => {
      setRealEstate(data || []);  // Default to empty array if data is undefined
    })
    .catch((error) => console.error('Error fetching real estate data:', error));
}, []);


useEffect(()=>{
  if (Array.isArray(realEstate) && realEstate.length > 0) {
    const filtered = realEstate.filter((item) => {
      const matchesRegion = selectedRegion.length === 0 || selectedRegion.includes(item.city?.region?.id);
        const matchesMinPrice = !minSelectedPrice || item.price >= parseInt(minSelectedPrice.replace(',', '')); // Handle min price
        const matchesMaxPrice = !maxSelectedPrice || item.price <= parseInt(maxSelectedPrice.replace(',', '')); // Handle max price
        const matchesMinArea = !minSelectedArea || item.area >= parseInt(minSelectedArea.replace(',', '')); // Handle min Area
        const matchesMaxArea = !maxSelectedArea || item.area <= parseInt(maxSelectedArea.replace(',', '')); // Handle max Area
        const matchesBedrooms = bedrooms === '' || item.bedrooms === Number(bedrooms);



        return matchesRegion && matchesMinPrice && matchesMaxPrice && matchesMinArea && matchesMaxArea && matchesBedrooms;
      
    });
   
    setFilteredRealEstate(filtered);
  } else {
    setFilteredRealEstate(realEstate || []);  // Ensure filteredRealEstate is always an array
  }
}, [realEstate,selectedRegion,minSelectedPrice, maxSelectedPrice,minSelectedArea,maxSelectedArea,bedrooms]);






  return (
    <ThemeContext.Provider value={{ setRealEstate,selectedRegion,setSelectedRegion,setMinSelectedPrice,setMaxSelectedPrice,setMinSelectedArea, setMaxSelectedArea,setBedrooms }}>
 <div> 
      <Header/>
      <Card filteredRealEstate={filteredRealEstate}/>
    <SearchBar />


    </div>
  </ThemeContext.Provider>
     
  )
}

export default Home;
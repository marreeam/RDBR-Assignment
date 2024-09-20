import React, { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";
import SearchBar from "./components/searchBar/searchBar";
import Card from "./components/Card/card";
import AppliedFilters from "./components/AppliedFilters/AppliedFilters";
import RealEstateDetail from "./components/ListingPage/ListingPage";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [selectedRegionNames, setSelectedRegionNames] = useState([]); 
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const location = useLocation();


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
    <ThemeContext.Provider value={{ realEstate, setRealEstate, selectedRegion, setSelectedRegion, setMinSelectedPrice, setMaxSelectedPrice, setMinSelectedArea, setMaxSelectedArea, setBedrooms, bedrooms, selectedRegionNames, setSelectedRegionNames, selectedRegion, minSelectedPrice, maxSelectedPrice, minPrice, maxPrice, setMaxPrice, setMinPrice, minSelectedArea, maxSelectedArea, minArea, setMinArea, maxArea, setMaxArea,setFilteredRealEstate,filteredRealEstate }}>
      <div> 
        <Header />
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <AppliedFilters />
                <div className=" relative top-[225px] left-[162px]">
                <Card  filteredRealEstate={filteredRealEstate} />
                </div>
                {/* Added p element */}
                {filteredRealEstate.length === 0 && (
                  <p className='font-fira-go text-[20px] font-normal leading-[24px] text-center w-[504px] h-[24px] top-[334px] left-[162px] absolute' style={{ color: 'rgba(2, 21, 38, 0.7)' }}>
                    აღნიშნული მონაცემებით განცხადება არ მოძებნა
                  </p>
                )}
              </>
            }
          />
          {/* Real Estate Detail Route */}
          <Route path="/real-estate/:id" element={<RealEstateDetail />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default Home;

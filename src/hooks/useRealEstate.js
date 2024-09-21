import { useState } from 'react';

export const useRealEstateState = () => {
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


  return {
    realEstate,
    setRealEstate,
    filteredRealEstate,
    setFilteredRealEstate,
    selectedRegion,
    setSelectedRegion,
    minSelectedPrice,
    setMinSelectedPrice,
    maxSelectedPrice,
    setMaxSelectedPrice,
    minSelectedArea,
    setMinSelectedArea,
    maxSelectedArea,
    setMaxSelectedArea,
    bedrooms,
    setBedrooms,
    selectedRegionNames,
    setSelectedRegionNames,minPrice, setMinPrice,maxPrice, setMaxPrice,minArea, setMinArea,maxArea, setMaxArea
  };
};

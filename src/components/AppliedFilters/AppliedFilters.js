import React, { useContext } from 'react';
import { ThemeContext } from "../../App";
import deleteIcon from "../../assets/x.png";
const AppliedFilters = () => {
  const { 
    selectedRegionNames, 
    setSelectedRegionNames,
    selectedRegion, 
    setSelectedRegion,
    minSelectedPrice,
    maxSelectedPrice,
    setMinSelectedPrice,
    setMaxSelectedPrice,
    setMinSelectedArea, setMaxSelectedArea,setMaxPrice,setMinPrice,minSelectedArea,maxSelectedArea,setMinArea,setMaxArea,bedrooms,setBedrooms
  } = useContext(ThemeContext);

  // Handle removal of region by name and ID
  const handleRemoveRegion = (regionName, regionId) => {
    setSelectedRegionNames(selectedRegionNames.filter(name => name !== regionName));
    setSelectedRegion(selectedRegion.filter(id => id !== regionId));
    setSelectedRegionNames([]); // Clears all region names
    setSelectedRegion([]);   

  };

  // Handle removal of price range
  const handleRemovePrice = () => {
    setMinSelectedPrice(null); // Clear min price
    setMaxSelectedPrice(null); // Clear max price
    setMinPrice(''); // Clear minPrice input
    setMaxPrice(''); 

  };
  const handleRemoveArea = () => {
    setMinSelectedArea(null); // Clear min price
    setMaxSelectedArea(null); // Clear max price
    setMinArea("");
    setMaxArea("");
   

  };
const handleRemoveBedrooms = () => {
    setBedrooms(''); // Clear bedroom filter
  };
const handleRemoveAll=()=>{
  handleRemoveRegion();handleRemoveArea();handleRemoveBedrooms();handleRemovePrice();
}
const anyFilterActive = 
selectedRegionNames.length > 0 || 
minSelectedPrice !== null || 
maxSelectedPrice !== null || 
minSelectedArea !== null || 
maxSelectedArea !== null || 
bedrooms !== '';

  return (
    <div className="w-auto h-auto absolute top-[240px] left-[162px] gap-[16px] m-3">
      {/* Flexbox container for both region and price filters */}
      <div className="flex flex-wrap gap-[8px]">
        {/* Render the selected region names */}
        {selectedRegionNames.length > 0 && selectedRegionNames.map((regionName, index) => {
          const regionId = selectedRegion[index]; // This assumes names and IDs are aligned

          return (
            <div
              key={index}
              className="flex items-center gap-[4px] text-[14px] rounded-[43px] border border-[1px] pt-[6px] pb-[10px] pl-[6px] pr-[10px]"
            >
              {regionName}
              <img
                onClick={() => handleRemoveRegion(regionName, regionId)}
                className="w-[14px] h-[14px] cursor-pointer"
                src={deleteIcon}
                alt="deleteIcon"
              />
            </div>
          );
        })}

        {/* Render the selected price range if it's set */}
        {(minSelectedPrice !== null || maxSelectedPrice !== null) && (
          <div className="flex items-center gap-[4px] text-[14px] rounded-[43px] border border-[1px] pt-[6px] pb-[10px] pl-[6px] pr-[10px]">
            <span>
              {minSelectedPrice ? `${minSelectedPrice}₾` : ''} - {maxSelectedPrice ? `${maxSelectedPrice}₾` : 'No Max'}
            </span>
            <img
              onClick={handleRemovePrice}
              className="w-[14px] h-[14px] cursor-pointer"
              src={deleteIcon}
              alt="deleteIcon"
            />
          </div>
        )}
          {(minSelectedArea !== null || maxSelectedArea !== null) && (
          <div className="flex items-center gap-[4px] text-[14px] rounded-[43px] border border-[1px] pt-[6px] pb-[10px] pl-[6px] pr-[10px]">
            <span>
              {minSelectedArea ? `${minSelectedArea}მ²` : ''} - {maxSelectedArea ? `${maxSelectedArea}მ²` : 'No Max'}
            </span>
            <img
              onClick={handleRemoveArea}
              className="w-[14px] h-[14px] cursor-pointer"
              src={deleteIcon}
              alt="deleteIcon"
            />
          </div>
        )}
         {bedrooms && (
          <div className="flex items-center gap-[4px] text-[14px] rounded-[43px] border border-[1px] pt-[6px] pb-[10px] pl-[6px] pr-[10px]">
            <span>
              {bedrooms} 
            </span>
            <img
              onClick={handleRemoveBedrooms}
              className="w-[14px] h-[14px] cursor-pointer"
              src={deleteIcon}
              alt="deleteIcon"
            />
          </div>
        )}

{anyFilterActive && (
        <button
       
          onClick={handleRemoveAll}
        >
       გასუფთავება
        </button>
      )}
      </div>
    </div>
  );
};

export default AppliedFilters;

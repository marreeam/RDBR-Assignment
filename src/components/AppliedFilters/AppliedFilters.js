import React, { useContext } from 'react';
import { ThemeContext } from "../../home";
import deleteIcon from "../../assets/x.png";

const AppliedFilters = () => {
  const { 
    selectedRegionNames, 
    setSelectedRegionNames,
    selectedRegion, 
    setSelectedRegion 
  } = useContext(ThemeContext);

  // Handle removal of region by name and ID
  const handleRemoveRegion = (regionName, regionId) => {
    setSelectedRegionNames(selectedRegionNames.filter(name => name !== regionName));
    setSelectedRegion(selectedRegion.filter(id => id !== regionId));
  };

  return (
    <div className="w-auto h-auto absolute top-[240px] left-[162px] gap-[16px] m-3">
      {/* Render the selected region names */}
      {selectedRegionNames.length > 0 && (
        <div className="flex flex-wrap gap-[8px]">
          {selectedRegionNames.map((regionName, index) => {
            // Find the corresponding regionId for the regionName
            const regionId = selectedRegion[index]; // This assumes names and IDs are aligned in the same order

            return (
              <div
                key={index}
                className="flex items-center gap-[4px] text-[14px] rounded-[43px] border border-[1px] pt-[6px] pb-[10px] pl-[6px] pr-[10px]"
              >
                {regionName}
                <img
                  onClick={() => handleRemoveRegion(regionName, regionId)} // Use the handler
                  className="w-[14px] h-[14px] cursor-pointer"
                  src={deleteIcon}
                  alt="deleteIcon"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppliedFilters;




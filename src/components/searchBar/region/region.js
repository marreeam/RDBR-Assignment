import React, { useState, useEffect, useContext } from 'react';
import BoxModel from '../boxModel/boxModel.js'; // Import the BoxModel component
import box from '../../../assets/checkbox.png'; // Unchecked image
import checkedbox from '../../../assets/checkbox1.png'; // Checked image
import { ThemeContext } from '../../../home.js';

const Region = () => {
  const [regions, setRegions] = useState([]);
  const [tempSelectedRegion, setTempSelectedRegion] = useState([]); // Temporary region state

  const { setRealEstate, selectedRegion, setSelectedRegion } = useContext(ThemeContext);

  useEffect(() => {
    fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions')
      .then((response) => response.json())
      .then((data) => setRegions(data))
      .catch((error) => console.error('Error fetching regions:', error));
  }, []);

  // Handle region selection
  const handleRegionSelect = (regionId) => {
    if (tempSelectedRegion.includes(regionId)) {
      // Remove the region if already selected
      setTempSelectedRegion(tempSelectedRegion.filter((region) => region !== regionId));
    } else {
      // Add the selected region
      setTempSelectedRegion([...tempSelectedRegion, regionId]);
    }
  };

  // Commit the selected regions when "არჩევა" is clicked

  const handleChooseClick = () => {
    setSelectedRegion(tempSelectedRegion); // Commit the temporary selected regions
  };



  return (
    <BoxModel
      title="რეგიონი"
      insideTitle="რეგიონის"
      onChooseHandle={handleChooseClick} // Pass the commit function to BoxModel
      selectedRegion={tempSelectedRegion} // Pass tempSelectedRegion instead
    >
      {/* Region List with Your Layout */}
      <div className="grid grid-cols-3 ">
        {regions.map((region) => (
          <div
            key={region.id}
            onClick={() => handleRegionSelect(region.id)}
            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer gap-[8px]"
          >
            <img
              src={tempSelectedRegion.includes(region.id) ? checkedbox : box}
              alt="Box Icon"
              className="w-5 h-5 mr-2"
            />
            <span>{region.name}</span>
          </div>
        ))}
      </div>
    </BoxModel>
  );
};

export default Region;


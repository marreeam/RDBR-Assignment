import React, { useState, useContext,useEffect } from 'react';
import BoxModel from "../boxModel/boxModel";
import { ThemeContext } from '../../../home.js';

const Bedrooms = () => {
  const [localBedrooms, setLocalBedrooms] = useState('');  // Local state for bedroom input
  const { setBedrooms,bedrooms } = useContext(ThemeContext);  // Get the global setBedrooms function from context

  useEffect(() => {
    setLocalBedrooms(bedrooms);  // Update local state whenever global bedrooms state changes
  }, [bedrooms]);
  // Function to handle input change for bedrooms
  const handleBedroomsChange = () => {
    // Set the global bedrooms state when "Choose" is clicked
    setBedrooms(localBedrooms);  // Update global bedrooms with valid number or empty string

  };


  // Function to validate and update the localBedrooms state
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Allow the value to be a number or an empty string (so the user can clear the input)
    if (value === '' || /^\d+$/.test(value)) {
      setLocalBedrooms(value);  // Update local state with the valid number or empty string
    }
  };

  return (
    <BoxModel 
      title="საძინებლების რაოდენობა" 
      insideTitle="საძინებლების რაოდენობის" 
      onChooseHandle={handleBedroomsChange}  // Trigger handleBedroomsChange when "Choose" is clicked
    >
      {/* Bedroom Input */}
      <div className="flex flex-col mb-4">
        <input
          type="text"
          value={localBedrooms}  // Local state
          onChange={handleInputChange}  // Validate and update local state on input change
          placeholder="2"
          className="w-[41px] h-[42px] text-[17px] border rounded-[10px] border-custom-gray text-center"
        />
      </div>
    </BoxModel>
  );
};

export default Bedrooms;

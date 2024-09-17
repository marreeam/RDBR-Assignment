import React, { useState } from 'react';
import icon from '../../../assets/Icon.png'; // Import your default icon
import icon1 from '../../../assets/Icon1.png'; // Import your alternate icon
// import { ThemeContext } from '../App';
const BoxModel = ({ title, children, insideTitle,selectedRegion,minPrice, maxPrice,onChooseHandle}) => {
  const [isOpen, setIsOpen] = useState(false); // To manage visibility of the box
  const [iconState, setIconState] = useState(icon); // Manage icon state
  // const {  setRealEstate } = useContext(ThemeContext);
  // Toggle the dropdown and icon state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIconState(isOpen ? icon : icon1); // Switch icon when dropdown is toggled
  };
function closeBox(){
  setIsOpen(!isOpen);
  setIconState(isOpen ? icon : icon1)

}

return (
    <div >
      {/* Trigger Element with Icon */}
      <div 
        className="w-auto h-auto pt-[8px] pb-[8px] pl-[14px] pr-[14px] gap-[4px] rounded flex items-center cursor-pointer bg-background
 "
        onClick={toggleDropdown}
      >
        <span>{title}</span>
        <img src={iconState} alt="Dropdown Icon" className="ml-2 w-4 h-4" />
      </div>

      {/* Box Content */}
      {isOpen && (
        <div className="top-[75px] absolute  h-auto p-[24px] gap-[32px] rounded-[10px] border border-gray-300 bg-white">
          {/* Dynamic Title with "მიხედვით" */}
          <div className="text-[16px] font-medium  text-left p-2">
            {insideTitle} მიხედვით
          </div>

          {/* Dynamic Content (Children) */}
          <div className="mt-4">
            {children} {/* This will be different for each component */}
          </div>

          {/* Action Button */}
          <div className="flex justify-end mt-4">
            <button onClick={()=>{onChooseHandle();closeBox()}} className="bg-red-500 text-white pt-[8px] pb-[8px] pl-[14px] pr-[14px]  rounded-[8px] gap-[2px]">არჩევა</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxModel;

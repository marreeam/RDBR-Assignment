import React, { useState,useContext } from 'react';
import BoxModel from '../boxModel/boxModel';
import ForPriceAndArea from '../boxModel/forPriceAndArea';
import { ThemeContext } from '../../../pages/home';
const Area = () => {

  const { setMinSelectedArea, setMaxSelectedArea,minArea,setMinArea,maxArea,setMaxArea} = useContext(ThemeContext);
  const handleChooseArea = () => {
    // Set the selected min and max area in the context
    setMinSelectedArea(minArea);
    setMaxSelectedArea(maxArea);
  };
  return (
    <BoxModel title="ფართობი" insideTitle="ფართობის" onChooseHandle={handleChooseArea} minArea={minArea} maxArea={maxArea} >
   <ForPriceAndArea
   minArea={minArea}
   maxArea={maxArea}
   setMinArea={setMinArea}
   setMaxArea={setMaxArea}
   OptionsForArea={['50,000', '50,000', '50,000', '50,000', '50,000']}
   TitlesForArea={['მინ. მ²', 'მაქს. მ²']}
   />
    </BoxModel>
  );
};

export default Area;

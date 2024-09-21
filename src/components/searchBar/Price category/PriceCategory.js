import React, { useState,useContext } from 'react';
import BoxModel from '../boxModel/boxModel';
import ForPriceAndArea from '../boxModel/forPriceAndArea';
import { ThemeContext } from '../../../pages/home';
const PriceCategory = () => {
 
 
  const { setMinSelectedPrice, setMaxSelectedPrice,minPrice, setMinPrice,maxPrice, setMaxPrice} = useContext(ThemeContext); // Get context for price filter
  const handleChoosePrice = () => {
    // Set the selected min and max price in the context
    setMinSelectedPrice(minPrice);
    setMaxSelectedPrice(maxPrice);
  };

  return (
    <BoxModel title="საფასო კატეგორია" insideTitle="ფასის" minPrice={minPrice}
    maxPrice={maxPrice}   onChooseHandle={handleChoosePrice} >
   <ForPriceAndArea
   minPrice={minPrice}
   maxPrice={maxPrice}
   setMinPrice={setMinPrice}
   setMaxPrice={setMaxPrice}
   OptionsForPrice={['50,000', '100,000', '150,000', '200,000', '300,000']}
   TitlesForPrice={['მინ. ფასი', 'მაქს. ფასი']}
   isPrice={true}
   />
    </BoxModel>
  );
};

export default PriceCategory;

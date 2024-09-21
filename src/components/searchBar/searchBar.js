import React from 'react';
import Region from './region/region';
import PriceCategory from './Price category/PriceCategory';
import Area from './area/area';
import AddListing from "../../pages/AddListing";
import AddAgent from "./AddAgent/AddAgent";
import Bedrooms from './bedrooms/bedrooms';

const searchBar= () => {

  return (
    <div className="w-[1596px] h-auto absolute top-[177px] left-[162px]  border-[1px] p-[6px] rounded-[10px] gap-[24px] z-20">

      <div className="flex gap-[10px]">
        <Region/>
        <PriceCategory/>
        <Area/>
        <Bedrooms/>

        <div className="flex gap-[10px] ml-auto"> {/* Add margin-left auto to push buttons to the right */}
         
         <AddListing/>
        <AddAgent/>
           </div>
       </div>



    </div>
  );
};

export default searchBar;

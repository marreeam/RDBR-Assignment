import React from "react";

const ForPriceAndArea = ({OptionsForArea,OptionsForPrice,TitlesForArea,TitlesForPrice,minPrice,maxPrice,setMinPrice,setMaxPrice,setMinArea,setMaxArea,minArea,maxArea,isPrice})=>{
  const isPriceInvalid= isPrice && minPrice && maxPrice && Number(minPrice) > Number(maxPrice); 
  const isAreaInvalid=  minArea && maxArea&& Number(minArea) > Number(maxArea); 
    return(
        <div>
              <div className="flex justify-between gap-[32px] mb-4">
        <div className="flex flex-col">
  
        <input
            type="text"
            value={isPrice ? minPrice : minArea} 
            placeholder={"დან"}
            onChange={(e) => (isPrice ? setMinPrice(e.target.value) : setMinArea(e.target.value))} 
            className="w-[155px] h-[42px] p-[10px] rounded-[6px] border border-custom-gray"
          />
        </div>

        <div className="flex flex-col">
        <input
            type="text"
            value={isPrice ? maxPrice : maxArea} 
            placeholder={"დან"}
            onChange={(e) => (isPrice ? setMaxPrice(e.target.value) : setMaxArea(e.target.value))} 
            className="w-[155px] h-[42px] p-[10px] rounded-[6px] border border-custom-gray"
          />

        </div>
      </div>

      {isPriceInvalid && (
        <p className="text-red-500">
          შეიყვანეთ ვალიდური მონაცემები
        </p>
      )}
       {isAreaInvalid && (
        <p className="text-red-500">
          შეიყვანეთ ვალიდური მონაცემები
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 text-left">
       {(isPrice ? TitlesForPrice : TitlesForArea).map((title, colIndex) => (
          <div key={colIndex}>
            <div className="font-bold">{title}</div>
            {(isPrice ? OptionsForPrice : OptionsForArea).map((option, index) => (
              <div key={index} className="p-2 ">
                {option} {isPrice ? "₾" :"მ²" } 
              </div>
            ))}
          </div>
        ))}
      </div>
     
        </div>
    )



}
export default ForPriceAndArea;
import React from 'react';
import { Link } from 'react-router-dom'; 
import BedIcon from "../../assets/bed.png";
import Vector from "../../assets/Vector.png";
import Vector2 from "../../assets/Vector2.png";
import LocationIcon from "../../assets/location-marker.png";

const Card = ({ filteredRealEstate }) => {
  return (
    <div className="relative w-[1586px] h-auto   grid grid-cols-4 gap-[20px]">
      {Array.isArray(filteredRealEstate) && filteredRealEstate.length > 0 && (
        filteredRealEstate.map((item) => (
          <Link to={`/real-estate/${item.id}`} key={item.id} className="card">
            <div className="relative rounded-[15px]" style={{ boxShadow: '5px 5px 12px 0px #02152614' }}>
              {/* Main Image */}
              <img className="w-[384px] h-[307px] rounded-t-[14px] object-cover" src={item.image} alt="Real estate" />
              
              {/* Rental or Sale (Absolute Positioned Badge) */}
              <div className="absolute top-3 left-3 w-[90px] h-[26px] bg-isrental rounded-[15px] p-[6px] text-center text-[12px] z-10 text-white">
                {item.is_rental ? 'ქირავდება' : 'იყიდება'}
              </div>

              {/* Card Content */}
              <div className="w-[382px] h-[148px] rounded-b-[14px] border border-custom-gray border-t-0 border-r border-b border-l pt-[22px] pb-[25px] pl-[22px] pr-[25px]">
                <p className='font-bold text-[28px] leading-[33.6px] text-left mb-3'>{item.price} ₾</p>
                <p className='text-[16px] leading-[19.2px] text-left flex flex-wrap mb-3' style={{ fontWeight: "400", color: 'rgba(2, 21, 38, 0.7)' }}>
                  <img className="w-[20px] h-[20px]" src={LocationIcon} alt="Location" /> {item.city.name}, {item.address}
                </p>

                <div className='flex flex-wrap gap-[32px]' style={{ color: 'rgba(2, 21, 38, 0.7)' }}>
                  <p className='font-fira-go flex flex-wrap text-[16px] gap-[6px] font-normal'>
                    <img className="w-[24px] h-[24px]" src={BedIcon} alt="Bedrooms" /> {item.bedrooms}
                  </p>
                  <p className='flex flex-wrap text-[16px] gap-[6px] font-normal'>
                    <img className="w-[24px] h-[24px]" src={Vector} alt="Area" /> {item.area} მ²
                  </p>
                  <p className='flex flex-wrap text-[16px] gap-[6px] font-normal'>
                    <img className="w-[24px] h-[24px]" src={Vector2} alt="Zip code" /> {item.zip_code}
                  </p>
                </div>
       
              </div>
           
            </div>
          </Link>
        ))
      )}
               {filteredRealEstate.length === 0 && (
        <p
          className="font-fira-go text-[20px] font-normal leading-[24px] text-center w-[504px] h-[24px]   absolute"
          style={{ color: 'rgba(2, 21, 38, 0.7)' }}
        >
          აღნიშნული მონაცემებით განცხადება არ მოძებნა
        </p>
      )}
    </div>
  );
};


export default Card;

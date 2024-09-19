import React from "react";
import locationIcon from "../../assets/location-marker.png";
import vector from "../../assets/Vector.png";
import bedIcon from "../../assets/bed.png";
import vector2 from "../../assets/Vector2.png";

const PropertyDetails = ({ details }) => {
  const { price, city, address, area, bedrooms, zip_code, description } = details;

  return (
    <div className="flex flex-col gap-[24px] w-[338px] h-[246px]">
      <p className="text-[48px]">{price} ₾</p>
      <div className="flex flex-col gap-[16px]">
        <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
          <img className="w-[17px] h-[17px]" src={locationIcon} alt="locationIcon" />
          {city?.name}, {address}
        </p>
        <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
          <img className="w-[15px] h-[15px]" src={vector} alt="Area Icon" />
          ფართი {area} მ²
        </p>
        <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
          <img className="w-[17px] h-[17px]" src={bedIcon} alt="bedIcon" /> საძინებელი {bedrooms}
        </p>
        <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
          <img className="w-[17px] h-[17px]" src={vector2} alt="vector2 Icon" />
          საფოსტო ინდექსი {zip_code}
        </p>
      </div>
      <p className="text-[16px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
        {description}
      </p>
    </div>
  );
};

export default PropertyDetails;

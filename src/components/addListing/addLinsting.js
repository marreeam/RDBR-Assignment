import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import locationIcon from "../../assets/location-marker.png";
import vector from "../../assets/Vector.png";
import vector2 from "../../assets/Vector2.png";
import bedIcon from "../../assets/bed.png";

const RealEstateDetail = () => {
  const { id } = useParams(); // Retrieve the real estate ID from the URL
  const [realEstate, setRealEstate] = useState(null); // State to store real estate details
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch real estate details with agent info
    fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer 9d047c0d-30dc-4458-b641-f99e302e2835',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRealEstate(data); // Set the real estate data, including agent info
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching real estate details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  if (!realEstate) {
    return <p>Real Estate not found.</p>; // Show this if no real estate data is found
  }

  const { price, image, city, address, area, bedrooms, zip_code, description, agent } = realEstate;

  return (
    <div className="w-[1591px] h-[714px] top-[225px] left-[162px] gap-[68px] absolute flex">
      <img
        className="w-[839px] h-[670px] rounded-t-[14px]"
        src={image}
        alt="Real Estate"
      />

      <div className="flex flex-col p-[30px] gap-[40px]">
        <div className="flex flex-col gap-[24px] w-[338px] h-[246px]">
          <p className="text-[48px]">{price} ₾</p>

          <div className="flex flex-col gap-[16px]">
            <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
              <img className="w-[17px] h-[17px]" src={locationIcon} alt="locationIcon" />{" "}
              {city?.name}, {address}
            </p>

            <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
              <img className="w-[15px] h-[15px]" src={vector} alt="Area Icon" />
              ფართი {area} მ²
            </p>
            <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
              <img className="w-[17px] h-[17px]" src={bedIcon} alt="bedIcon" /> საძინებელი{" "}
              {bedrooms}
            </p>
            <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
              <img className="w-[17px] h-[17px]" src={vector2} alt="vector2 Icon" />
              საფოსტო ინდექსი {zip_code}
            </p>
          </div>
        </div>

        {/* Description and agent */}
        <div className="flex flex-col gap-[50px]  ">
          <p className="text-[16px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
    {description}
          </p>

          {agent ? (
            <div className="w-[503px] h-[174px] radius-[8px] flex items-center  " style={{border: "1px solid rgba(219, 219, 219, 1)"}}>
                <img className="rounded-[100px]  mr-[16px] w-[72px] h-[72px]" src={agent.avatar}  alt={`${agent.name} ${agent.surname}`}/>
              <p className="w-[142px] h-19px top-[40px] left-[106px]  " >{agent.name} {agent.surname}</p>
              <p>{agent.email}</p>
            </div>
          ) : (
            <p>Agent information not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default RealEstateDetail;

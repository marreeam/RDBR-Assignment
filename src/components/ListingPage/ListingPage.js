import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import locationIcon from "../../assets/location-marker.png";
import vector from "../../assets/Vector.png";
import vector2 from "../../assets/Vector2.png";
import bedIcon from "../../assets/bed.png";
import mailIcon from "../../assets/mailIcon.png";
import phoneIcon from "../../assets/phoneIcon.png";
import arrow from "../../assets/arrow.png";
import Slider from "react-slick";
import { ThemeContext } from "../../home";
import Card from "../Card/card";
import {handleDeleteListing} from "./handleDeleteListing";// Import the utility function

const RealEstateDetail = () => {
  const { id } = useParams(); 
  const [realEstateId, setRealEstateId] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const { setRealEstate,realEstate } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const [similarListings, setSimilarListings] = useState([]);

  const navigate = useNavigate(); 

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
        setRealEstateId(data);
        setLoading(false);
        if (data && data.city?.region?.id) {
          const filteredListings = realEstate.filter(
            (item) => item.city?.region?.id === data.city.region.id && item.id !== id
          );
          setSimilarListings(filteredListings);
        }
      })
      .catch((error) => {
        console.error('Error fetching real estate details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!realEstateId) {
    return <p>Real Estate not found.</p>;
  }

  const { price, image, city, address, area, bedrooms, zip_code, description, agent, created_at,region } = realEstateId;
function handleCloseModal(){
  setShowModal(false);

}
function handleShowModal(){
  setShowModal(true)
}
const handleConfirmDelete = () => {
  handleDeleteListing(id, setRealEstate, navigate);
  setShowModal(false); // Close the modal after deletion
};
function close(){
  if (showModal==true){
    setShowModal(false);
   
  }
}
const carouselSettings = {
  dots: false,  // Hide default dots
  infinite: false,  // Disable infinite scrolling for clear navigation
  speed: 500,
  slidesToShow: 4,  // Show 4 listings at a time
  slidesToScroll: 1,  // Scroll one listing at a time
  arrows: true,  // Show navigation arrows
  nextArrow: <NextArrow />,  // Custom Next Arrow
  prevArrow: <PrevArrow />,  // Custom Prev Arrow
  responsive: [
   
  ],
};

// Custom next and previous arrow components
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
    
      className="slick-next"
      style={{
        display: "block",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
       <img src={arrow} alt="Next"style={{transform: "rotate(180deg)"} } />
     
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slick-prev"
      style={{
        display: "block",
       cursor:"pointer"
      }}
      onClick={onClick}
    >
      <img src={arrow} alt="Previous" />
    </div>
  );
}

  return (
    <div onClick={close}   > 
      <img onClick={() => navigate("/")} src={arrow} alt="backtohomepage" className="absolute w-[32px] h-[32px] top-[170px] left-[170px]" />

      <div className="w-[1591px] h-[714px] top-[225px] left-[162px] gap-[68px] absolute flex">
        <img
          className="w-[839px] h-[670px] rounded-t-[14px]"
          src={image}
          alt="Real Estate"
        />
        <p className="absolute top-[670px] left-[590px]" style={{ color: "rgba(128, 138, 147, 1)" }}>{created_at}</p>

        <div className="flex flex-col p-[30px] gap-[40px]">
          <div className="flex flex-col gap-[24px] w-[338px] h-[246px]">
            <p className="text-[48px]">{price} ₾</p>
            <div className="flex flex-col gap-[16px]">
              <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
                <img className="w-[17px] h-[17px]" src={locationIcon} alt="locationIcon" />{" "}
                {city?.name}, {address}
              </p>
              <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}><img className="w-[15px] h-[15px]" src={vector} alt="Area Icon" />ფართი {area} მ²</p>
              <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}><img className="w-[17px] h-[17px]" src={bedIcon} alt="bedIcon" /> საძინებელი{" "}{bedrooms}</p>
              <p className="flex flex-wrap gap-[6px]" style={{ color: "rgba(128, 138, 147, 1)" }}><img className="w-[17px] h-[17px]" src={vector2} alt="vector2 Icon" />საფოსტო ინდექსი {zip_code}</p>
            </div>
          </div>

          <div className="flex flex-col gap-[50px]">
            <p className="text-[16px]" style={{ color: "rgba(128, 138, 147, 1)" }}>{description} </p>

            <div className="gap-[20px] flex flex-col">
              <div className="w-[503px] h-[174px] radius-[8px] relative rounded-[8px]" style={{border: "1px solid rgba(219, 219, 219, 1)"}}>
                <img className="rounded-[100px] w-[72px] h-[72px] absolute top-[24px] left-[20px]" src={agent.avatar} alt={`${agent.name} ${agent.surname}`} />
                <p className="absolute top-[40px] left-[106px]">{agent.name} {agent.surname}</p>
                <p className="absolute top-[63px] left-[106px] text-[14px]" style={{ color: "rgba(128, 138, 147, 1)" }}>აგენტი</p>
                <p className="absolute top-[112px] left-[20px] flex items-center gap-[5px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
                  <img src={mailIcon} className="w-[16px] h-[13px]" alt="email" /> {agent.email}
                </p>
                <p className="absolute top-[133px] left-[20px] flex items-center gap-[5px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
                  <img src={phoneIcon} className="w-[13px] h-[13px]" alt="phone" /> {agent.phone}
                </p>
              </div>
              <button
                onClick={handleShowModal}
                className="rounded-[8px] p-[10px] gap-[10px] self-start"
                style={{ border: "1px solid rgba(103, 110, 118, 1)" }}
              >
                ლისტინგის წაშლა
              </button>
              {showModal && (
       <div
       className="fixed inset-0 flex items-center justify-center z-50"
     >
       <div 
         className="w-[623px] h-[222px] rounded-[20px] p-[20px] flex flex-col justify-center items-center"
         style={{ 
           background: "rgba(255, 255, 255, 1)", 
           boxShadow: "5px 5px 12px 0px rgba(2, 21, 38, 0.08)"  
         }}
       >
         <p className="text-[20px] mb-[20px]">გსურთ წაშალოთ ლისტინგი?</p>
         <div className="flex gap-[20px]">
           <button
             className="p-[10px] rounded-[10px]  "
             style={{border:" 1px solid rgba(249, 59, 29, 1)",color:"rgba(249, 59, 29, 1)"}}
             onClick={handleCloseModal}
           >
             გაუქმება
           </button>
           <button
             className="p-[10px] rounded-[10px] text-white"
             style={{  background: "rgba(249, 59, 29, 1)"}}
             onClick={handleConfirmDelete}
           >
             დადასტურება
           </button>
         </div>
       </div>
     </div>



      )}
            </div>
          </div>
        </div>
      </div>
      <p className=" relative top-[850px] text-[24px] left-[162px] " style={{color:"rgba(2, 21, 38, 1)"}}>ბინები მსგავს ლოკაციაზე</p>
      <div className="relative top-[600px] left-[40px]">
     
       
        <Slider {...carouselSettings} className="mt-[300px] w-[90%] mx-auto">
          
  {similarListings.map((listing) => (
    <div key={listing.id} className="px-4">
      <Card filteredRealEstate={[listing]} /> {/* Pass the listing as an array */}
    </div>
  ))}
</Slider>
      </div>
    </div>
  );
};

export default RealEstateDetail;

import React from "react";
import Slider from "react-slick";
import Card from "../Card/card";
import arrow from "../../assets/arrow.png";

const CustomArrow = ({ onClick, isNext }) => (
  <div onClick={onClick} className={isNext ? "slick-next" : "slick-prev"}>
    <img src={arrow} alt={isNext ? "Next" : "Previous"} style={{ transform: isNext ? "rotate(180deg)" : "" }} />
  </div>
);

const SimilarListingsCarousel = ({ listings }) => {
  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow isNext={true} />,
    prevArrow: <CustomArrow isNext={false} />
  };

  return (
    <Slider {...carouselSettings} className="mt-[300px] w-[90%] mx-auto">
      {listings.map((listing) => (
        <Card key={listing.id} filteredRealEstate={[listing]} />
      ))}
    </Slider>
  );
};

export default SimilarListingsCarousel;

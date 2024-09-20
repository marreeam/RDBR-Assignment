import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../home";
import Card from "../Card/card";
import { handleDeleteListing } from "./handleDeleteListing";
import PropertyDetails from "./propertyDetails";
import AgentInfo from "./agentInfo";
import DeleteConfirmationModal from "./deleteConfirmationModal";
import SimilarListingsCarousel from "./similarListingsCarosuel";
import arrow from "../../assets/arrow.png";

const RealEstateDetail = () => {
  const { id } = useParams(); // Track ID from URL parameters
  const [realEstateId, setRealEstateId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { setRealEstate, realEstate } = useContext(ThemeContext);
  const [similarListings, setSimilarListings] = useState([]);
  const navigate = useNavigate();

  // Effect to fetch the listing data when the component mounts or `id` changes
  useEffect(() => {
    fetchRealEstateDetails(id, setRealEstateId, setLoading, realEstate, setSimilarListings);
  }, [id, realEstate]); // Listen to changes in `id`

  const fetchRealEstateDetails = (id, setRealEstateId, setLoading, realEstate, setSimilarListings) => {
    // setLoading(true); // Set loading state true when fetching new data
    fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer 9d047c0d-30dc-4458-b641-f99e302e2835",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRealEstateId(data); // Set the data for the current listing
        setLoading(false);
        if (data && data.city?.region?.id) {
          const filteredListings = realEstate.filter(
            (item) => item.city?.region?.id === data.city.region.id && item.id !== id
          );
          setSimilarListings(filteredListings); // Filter similar listings
        }
      })
      .catch((error) => {
        console.error("Error fetching real estate details:", error);
        setLoading(false);
      });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmDelete = () => {
    handleDeleteListing(id, setRealEstate, navigate);
    setShowModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!realEstateId) return <p>Real Estate not found.</p>;
  function close(){
    if (showModal==true){
      setShowModal(false);
     
    }
  }
  return (
    <div onClick={close}>
      <img
        onClick={() => navigate("/")}
        src={arrow}
        alt="backtohomepage"
        className="absolute w-[32px] h-[32px] top-[170px] left-[170px]"
      />
      <div className="w-[1591px] h-[714px] top-[225px] left-[162px] gap-[68px] absolute flex">
        <img
          className="w-[839px] h-[670px] rounded-t-[14px]"
          src={realEstateId.image}
          alt="Real Estate"
        />
        <p className="absolute top-[670px] left-[590px]" style={{ color: "rgba(128, 138, 147, 1)" }}>
          {realEstateId.created_at}
        </p>
        <div className="flex flex-col p-[30px] gap-[90px]">
          <PropertyDetails details={realEstateId} />
          <AgentInfo agent={realEstateId.agent} />
          <button
            onClick={handleShowModal}
            className="rounded-[8px] p-[10px] gap-[10px] self-start"
            style={{ border: "1px solid rgba(103, 110, 118, 1)" }}
          >
            ლისტინგის წაშლა
          </button>
          {showModal && (
            <DeleteConfirmationModal
              onCancel={handleCloseModal}
              onConfirm={handleConfirmDelete}
            />
          )}
        </div>
      </div>
      <p
        className="relative top-[850px] text-[24px] left-[162px]"
        style={{ color: "rgba(2, 21, 38, 1)" }}
      >
        ბინები მსგავს ლოკაციაზე
      </p>
      <div className="relative top-[600px] left-[40px]">
        <SimilarListingsCarousel listings={similarListings} />
      </div>
    </div>
  );
};

export default RealEstateDetail;

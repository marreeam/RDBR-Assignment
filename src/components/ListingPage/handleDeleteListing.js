export const handleDeleteListing = (id, setRealEstate, navigate) => {
    fetch(`https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 9d047c0d-30dc-4458-b641-f99e302e2835",
      },
    })
      .then((response) => {
        if (response.ok) {
      
  
          // Update the context by removing the deleted listing
          setRealEstate((prevRealEstate) =>
            prevRealEstate.filter((item) => item.id !== id)
          );
          navigate("/"); // Redirect to home page
        } else {
          throw new Error("Failed to delete the listing");
        }
      })
      .catch((error) => {
        console.error("Error deleting real estate:", error);
        alert("Failed to delete the listing");
      });
  };
  


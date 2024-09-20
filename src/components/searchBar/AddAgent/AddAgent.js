import React, { useState } from "react";
import AgentAddModal from "./AgentAddModal";
const AddAgent= ()=>{

  const [showModal, setShowModal]=useState(false)
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  
    return (
<div  >

        <button onClick={handleShowModal} className="w-auto h-[47px] pt-[10px] pb-[16px] pl-[10px] pr-[16px] bg-[#F93B1D] text-white rounded-[10px]">
        + აგენტის დამატება
      </button>
      {showModal && (
              <AgentAddModal  closeModal={handleCloseModal}/>
          )}
   
      
      </div>
    )

}
export default AddAgent;
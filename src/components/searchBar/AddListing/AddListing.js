import React,{useState} from "react";
import AddListingForm from "./AddListingForm";
import { Link } from 'react-router-dom'; 
const AddListing= ()=>{
  

    return (
      <Link to={"/AddListing"}>

        <button className="w-auto h-[47px] pt-[10px] pb-[16px] pl-[10px] pr-[16px] bg-[#F93B1D] text-white rounded-[10px]">
        + ლისტინგის დამატება
      </button>
      </Link>
    )

}
export default AddListing;
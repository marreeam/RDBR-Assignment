import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useImagePreview } from '../../../hooks/useImagePreview';
import { UseImageUnpload } from '../../../hooks/useImageUnpload';

const AddListingForm = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const { selectedImage, handleImageChange } = useImagePreview();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const AddressValue = watch('address', '');
  const selectedRegion = watch('region');
  const ZipcodeValue=watch("zip_code","");
  const PriceValue=watch("price","");
  const AreaValue=watch("area","");
  const DescriptionValue=watch("description","");
  const BedroomsValue=watch("bedrooms","");

  

  // Fetch regions data
  useEffect(() => {
    fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions')
      .then((response) => response.json())
      .then((data) => setRegions(data))
      .catch((error) => console.error('Error fetching regions:', error));
  }, []);

  // Fetch cities data
  useEffect(() => {
    fetch('https://api.real-estate-manager.redberryinternship.ge/api/cities')
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error('Error fetching cities:', error));
  }, []);

  // Watch the selected region value


  useEffect(() => {
    
    if (selectedRegion) {
      const filtered = cities.filter(city => city.region_id === parseInt(selectedRegion));
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [selectedRegion, cities]);

  // Fetch agents data
  useEffect(() => {
    fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer 9d047c0d-30dc-4458-b641-f99e302e2835",
      }
    })
    .then((response) => response.json())
    .then((data) => setAgents(data))
    .catch((error) => console.error('Error fetching agents:', error));
  }, []);
  

  const onSubmit = async (data) => {
    const formData = new FormData();
   

    
    // Append all the form data
    formData.append('address', data.address);
  
    formData.append('region_id', data.region);   
    formData.append('description', data.description);
    formData.append('city_id', data.city); 

    formData.append('zip_code', data.zip_code);
    formData.append('price', data.price);   
    formData.append('area', data.area);    
    formData.append('bedrooms', data.bedrooms);  
    formData.append('is_rental', data.is_rental);  
    
    formData.append('agent_id', data.agents); 
    formData.append('image', data.image[0]); 

 
    try {
      const response = await fetch(
        'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer 9d047c0d-30dc-4458-b641-f99e302e2835',
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        navigate("/");
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
const handleCalcel=()=>{
  navigate("/")
}

  return (
    <div>
      <h1 className="absolute top-[162px] left-[787px] text-[32px]">ლისტინგის დამატება</h1>

      <div className="absolute w-[790px] h-[1211px] top-[261px] left-[566px] gap-[80px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Transaction Type */}
          <div>
            <label className="text-[16px]">გარიგების ტიპი *</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="0"
                  {...register('is_rental', { required: 'გთხოვთ, აირჩიოთ გარიგების ტიპი' })}
                />
                <span className="ml-2">იყიდება</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="1"
                  {...register('is_rental', { required: 'გთხოვთ, აირჩიოთ გარიგების ტიპი' })}
                />
                <span className="ml-2">ქირავდება</span>
              </label>
            </div>
            {errors.is_rental && <p className="text-red-500 text-sm mt-1">{errors.is_rental.message}</p>}
          </div>

          <h2>მდებარეობა</h2>
          <div className="flex space-x-4 mb-4 mt-4">
            {/* Address */}
            <div className="w-1/2">
              <label className="block mb-2 text-[14px]">მისამართი *</label>
              <input
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('address', {
                   required: 'გთხოვთ, შეიყვანეთ მისამართი' ,
                 })}
              />
               <p className={`text-[14px] ${AddressValue.length >= 2 ? 'text-green-500' : 'text-red-500'}`}>
                ✔️ მინიმუმ ორი სიმბოლო
              </p>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            

            {/* ZIP Code */}
            <div className="w-1/2">
              <label className="block mb-2 text-[14px]">საფოსტო ინდექსი *</label>
              <input
              type='number'
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('zip_code', { 
                  required: 'გთხოვთ, შეიყვანეთ საფოსტო ინდექსი',
                 
                 })}
              />
              <p className={`text-[14px] ${/^[0-9]+$/.test(ZipcodeValue) ? 'text-green-500' : 'text-red-500'}`}>
                ✔️ მხოლოდ რიცხვები
              </p>
              {errors.zip_code && <p className="text-red-500 text-sm mt-1">{errors.zip_code.message}</p>}
            </div>
          </div>

          {/* Region and City Selection */}
          <div className="flex space-x-4 mb-4 mt-4">
            <div className="w-1/2">
              <label className="block mb-2 text-[14px]">რეგიონი *</label>
              <select
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('region', { required: 'გთხოვთ, აირჩიოთ რეგიონი' })}
              >
                <option value="">აირჩიეთ რეგიონი</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
            </div>

        
              <div className="w-1/2">
                <label className="block mb-2 text-[14px]">ქალაქი *</label>
                <select
                  className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                  {...register('city', { required: 'გთხოვთ, აირჩიოთ ქალაქი' })}
                >
                  <option value="">აირჩიეთ ქალაქი</option>
                  {filteredCities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>
      
            </div>

          {/* Other Details */}
          <div>
            <h2>ბინის დეტალები</h2>
            <div className="flex space-x-4 mb-4 mt-4">
              {/* Price */}
              <div className="w-1/2">
                <label className="block mb-2 text-[14px]">ფასი *</label>
                <input
                type='number'
                  className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                  {...register('price', { required: 'გთხოვთ, შეიყვანეთ ფასი' ,
                   
                  })}
                />
                 <p className={`text-[14px] ${/^[0-9]+$/.test(PriceValue)? 'text-green-500' : 'text-red-500'}`}>
                ✔️ მხოლოდ რიცხვები
              </p>
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>

              {/* Area */}
              <div className="w-1/2">
                <label className="block mb-2 text-[14px]">ფართობი *</label>
                <input
                type='number'
                  className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                  {...register('area', { required: 'გთხოვთ, შეიყვანეთ ფართობი' ,})}
                />
                 <p className={`text-[14px] ${/^[0-9]+$/.test(AreaValue) ? 'text-green-500' : 'text-red-500'}`}>
                ✔️ მხოლოდ რიცხვები
              </p>
                {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}

              </div>
            </div>

            {/* Bedrooms */}
            <div className="">
              <label className="block mb-2 text-[14px]">საძინებლების რაოდენობა *</label>
              <input
              type='number'
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('bedrooms', { required: 'გთხოვთ, შეიყვანეთ საძინებლების რაოდენობა',})}
              />
               <p className={`text-[14px] ${/^[0-9]+$/.test(BedroomsValue) ? 'text-green-500' : 'text-red-500'}`}>
                ✔️ მხოლოდ რიცხვები
              </p>
              {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms.message}</p>}
            </div>

            {/* Description */}
            <div className="">
              <label className="block mb-2 text-[14px]">აღწერა *</label>
              <textarea
                className="w-[788px] h-[135px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('description', { required: 'გთხოვთ, შეიყვანეთ აღწერა' , minLength: {
                 }})}
              />
              <p className={`text-[14px] ${DescriptionValue.length >= 5 ? 'text-green-500' : 'text-red-500'}`}>
                ✔️ მინიმუმ ხუთი სიმბოლო
              </p>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
          </div>

         

          {/* Image Upload */}
          <UseImageUnpload errors={errors} register={register} />
           {/* Agent Selection */}
           <div className="w-1/2">
            <label className="block mb-2 text-[14px]">აირჩიე აგენტი *</label>
            <select
              className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
              {...register('agents', { required: 'გთხოვთ, აირჩიოთ აგენტი' })}
            >
              <option value="">აირჩიეთ აგენტი</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} {agent.surname}
                </option>
              ))}
            </select>
            {errors.agents && <p className="text-red-500 text-sm mt-1">{errors.agents.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-6">
            <button
            onClick={handleCalcel}
              type="button"
              className="relative px-6 pt-[10px] pb-[16px] rounded-lg left-[450px]"
              style={{ border: '1px solid rgba(249, 59, 29, 1)', color: 'rgba(249, 59, 29, 1)' }}
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="text-white px-6 py-2 rounded-lg"
              style={{ background: 'rgba(249, 59, 29, 1)' }}
            >
              დაამატე ლისტინგი
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingForm;



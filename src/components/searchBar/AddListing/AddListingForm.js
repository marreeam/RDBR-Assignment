import React from "react";
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from "react-router-dom";
const AddListingForm = () => {
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        const formData = new FormData();
    
        // Append form fields to formData
        formData.append('adress', data.adress);
        formData.append('zip_code', data.zip_code);
        formData.append('is_rental', data.is_rental);

    
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
            navigate("/")
            
           
          } else {
            console.error('Error:', response.statusText);

          }
        } catch (error) {
          console.error('Error:', error);
        }
      };



    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <div>
      <h1 className="absolute top-[162px] left-[787px] text-[32px]">ლისტინგის დამატება</h1>
      
      {/* Form container */}
      <div className="absolute w-[790px] h-[1211px] top-[261px] left-[566px] gap-[80px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Transaction Type */}
          <div>
            <label className="text-[16px]">გარიგების ტიპი *</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="იყიდება"
                  {...register('is_rental', { required: 'გთხოვთ, აირჩიოთ გარიგების ტიპი' })}
                />
                <span className="ml-2">იყიდება</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="ქირავდება"
                  {...register('is_rental', { required: 'გთხოვთ, აირჩიოთ გარიგების ტიპი' })}
                />
                <span className="ml-2">ქირავდება</span>
              </label>
            </div>
            {errors.is_rental && (
              <p className="text-red-500 text-sm mt-1">{errors.is_rental.message}</p>
            )}
          </div>
          
          {/* Name and Surname Row */}
          <div className="flex space-x-4 mb-4 mt-4">
            <div className="w-1/2">
              <label className="block mb-2">მისამართი *</label>
              <input
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('address', {
                  required: 'გთხოვთ, შეიყვანეთ მისამართი',
                  minLength: {
                    value: 2,
                    message: 'მისამართი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან',
                  },
                })}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            <div className="w-1/2">
              <label className="block mb-2">საფოსტო ინდექსი *</label>
              <input
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('zip_code', {
                  required: 'გთხოვთ, შეიყვანეთ საფოსტო ინდექსი',
                  minLength: {
                    value: 4,
                    message: 'საფოსტო ინდექსი უნდა შედგებოდეს მინიმუმ 4 სიმბოლოსგან',
                  },
                })}
              />
              {errors.zip_code && <p className="text-red-500 text-sm mt-1">{errors.zip_code.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-6">
            <button
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

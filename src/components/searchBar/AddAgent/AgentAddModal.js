import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useImagePreview } from '../../../hooks/useImagePreview';
import { UseImageUnpload } from '../../../hooks/useImageUnpload';
const AgentAddModal = ({ closeModal }) => {
  // For image preview
  const { selectedImage, handleImageChange, handleRemoveImage } = useImagePreview();
  const isAgent=true;
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm();

  // Watch the values to validate
  const nameValue = watch('name', '');
  const surnameValue = watch('surname', '');
  const phoneValue = watch('phone', '');
  const emailValue = watch('email', '');

  

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('image', data.image[0]);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
   }

    try {
      const response = await fetch(
        'https://api.real-estate-manager.redberryinternship.ge/api/agents',
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
        closeModal();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="absolute w-[1009px] h-[784px] inset-0 flex items-center justify-center z-50 left-[300px] rounded-[10px]" style={{ boxShadow: '5px 5px 4px 0px rgba(0, 0, 0, 0.08)', background: 'rgba(255, 255, 255, 1)' }}>
      <div>
        {/* Form Title */}
        <h2 className="absolute text-center top-[87px] left-[358px] text-[32px] font-semibold">აგენტის დამატება</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name and Surname Row */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2">სახელი*</label>
              <input
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('name', {
                  required: 'სახელი აუცილებელია',
                 
                })}
              />
              <p className={`text-[14px] ${nameValue.length >= 2 ? 'text-green-500' : 'text-red-500'}`}>
                ✔️ მინიმუმ ორი სიმბოლო
              </p>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="w-1/2">
              <label className="block mb-2">გვარი*</label>
              <input
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('surname', {
                  required: 'გვარი აუცილებელია',
                 
                })}
              />
              <p className={`text-[14px] ${surnameValue.length >= 2 ? 'text-green-500' : 'text-red-500'}`}>
                ✔️ მინიმუმ ორი სიმბოლო
              </p>
              {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>}
            </div>
          </div>

          {/* Phone Number and Email Row */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2">ტელ-ნომერი*</label>
              <input
                type="tel"
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('phone', {
                  required: 'ტელ-ნომერი აუცილებელია',
                 
                })}
              />
              <p className={`text-[14px] ${/^[0-9]{9}$/.test(phoneValue) ? 'text-green-500' : 'text-red-500'}`}>
                ✔️ მხოლოდ რიცხვები (9 სიმბოლო)
              </p>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div className="w-1/2">
              <label className="block mb-2">ელ-ფოსტა*</label>
              <input
                type="email"
                className="w-[384px] h-[42px] px-3 border border-solid border-[#808A93] rounded-[6px]"
                {...register('email', {
                  required: 'ელ-ფოსტა აუცილებელია',
                 
                })}
              />
              <p className={`text-[14px] ${/^[a-zA-Z0-9._%+-]+@redberry\.ge$/.test(emailValue) ? 'text-green-500' : 'text-red-500'}`}>
                ✔️ გამოიყენეთ @redberry.ge ფოსტა
              </p>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

        <UseImageUnpload register={register} errors={errors} isAgent={isAgent}/>





          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="relative px-6 pt-[10px] pb-[16px] rounded-lg left-[490px]"
              style={{ border: '1px solid rgba(249, 59, 29, 1)', color: 'rgba(249, 59, 29, 1)' }}
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="text-white px-6 py-2 rounded-lg"
              style={{ background: 'rgba(249, 59, 29, 1)' }}
            >
              დაამატე აგენტი
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentAddModal;

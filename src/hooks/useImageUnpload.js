
import { useImagePreview } from "./useImagePreview";


export const  UseImageUnpload=({errors,register,IsAgent})=>{
    const { selectedImage, handleImageChange, handleRemoveImage } = useImagePreview();
    return(

<div>

<label className="block mb-2">ატვირთეთ ფოტო *</label>
          <div className="mb-4 relative w-[799px] h-[120px] border-2 border-dotted border-[#2D3648] ">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              {...register(IsAgent?'avatar':"image", {
                required: 'ფოტოს ატვირთვა აუცილებელია',
                onChange: handleImageChange,
              })}
            />
            <label
              htmlFor="fileInput"
              className="w-[24px] h-[24px] absolute left-[380px] top-[40px] bg-white rounded-full flex items-center justify-center cursor-pointer border border-[1px]"
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-2xl text-gray-500">+</span>
              )}
            </label>
            {selectedImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 relative left-[350px] top-[60px] text-sm text-red-500"
              >
                Remove Image
              </button>
            )}
            {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>}
          </div>
          </div>)
}
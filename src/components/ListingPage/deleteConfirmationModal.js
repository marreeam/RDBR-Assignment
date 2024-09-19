import React from "react";

const DeleteConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="w-[623px] h-[222px] rounded-[20px] p-[20px] flex flex-col justify-center items-center"
        style={{
          background: "rgba(255, 255, 255, 1)",
          boxShadow: "5px 5px 12px 0px rgba(2, 21, 38, 0.08)",
        }}
      >
        <p className="text-[20px] mb-[20px]">გსურთ წაშალოთ ლისტინგი?</p>
        <div className="flex gap-[20px]">
          <button
            className="p-[10px] rounded-[10px]"
            style={{ border: "1px solid rgba(249, 59, 29, 1)", color: "rgba(249, 59, 29, 1)" }}
            onClick={onCancel}
          >
            გაუქმება
          </button>
          <button
            className="p-[10px] rounded-[10px] text-white"
            style={{ background: "rgba(249, 59, 29, 1)" }}
            onClick={onConfirm}
          >
            დადასტურება
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

import React, { Children } from "react";

const Modal = ({ isModelOpen, setIsModelOpen, children }) => {
  if (!isModelOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm h-screen w-screen px-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in-up">
        <button
          onClick={() => setIsModelOpen(false)}
          className="absolute top-4 right-4 text-gray-400 text-3xl hover:text-rose-500 transition-colors"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

import Image from "next/image";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-black relative flex text-white mx-3 flex-col items-center rounded-lg shadow-lg w-96 p-6 transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-90"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlciUyMHNxdXJlfGVufDB8fDB8fHww"
          alt="logo"
          width={150}
          height={150}
          className="rounded-full mt-8"
        />
        <h2 className="text-xl font-bold my-4">Olivia Wilson</h2>
        <span className="bg-[#262626] px-4 py-2 rounded-full border-[#515151] border-[1px] border-solid mb-4 font-poppins">
          Product Marketing Manager
        </span>
        <p className="mb-6 font-poppins text-center">Grow your business with our company. Come and experience the world of digital marketing!</p>
        <IoIosCloseCircleOutline className="text-white text-3xl cursor-pointer absolute top-4 right-4" onClick={onClose} />
      </div>
    </div>
  );
};

export default Modal;

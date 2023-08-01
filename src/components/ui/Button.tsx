import React from "react";

const Button = ({ text, alt }: { text: string; alt: boolean }) => {
  return (
    <button className="relative inline-flex items-center justify-start px-5 py-[15px] overflow-hidden text-xl rounded-xl group w-full">
      <span className={`${alt ? "bg-white" : "bg-primary"} w-full h-full absolute left-0 top-0`}></span>
      <span
        className={`${
          alt ? "bg-highlighter" : "bg-white"
        } absolute top-0 left-0 w-96 h-96 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-[460px] -translate-y-24 opacity-100 group-hover:-translate-x-20`}
      ></span>
      <span
        className={`${
          alt ? "text-bgDark" : "text-white group-hover:text-gray-900"
        } relative w-full text-center  transition-colors duration-200 ease-in-out `}
      >
        {text}
      </span>
      <span
        className={`${
          alt ? "hover:border-highlighter border-white" : "hover:border-white border-primary"
        } absolute inset-0 border-2  transition-colors duration-500 ease-in-out rounded-xl`}
      ></span>
    </button>
  );
};

export default Button;

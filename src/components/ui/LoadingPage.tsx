import React from "react";
import { CgSpinner } from "react-icons/cg";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CgSpinner className="text-6xl animate-spin" />
    </div>
  );
};

export default LoadingPage;

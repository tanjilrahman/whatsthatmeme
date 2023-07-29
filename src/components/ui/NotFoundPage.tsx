import Image from "next/image";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col space-y-6 items-center justify-center h-screen">
      <div className="w-96 h-64 relative ">
        <Image
          src="https://media.tenor.com/ZMNr5XyNp-sAAAAC/kitten-scared.gif"
          fill
          alt="not found"
          className="object-contain"
        />
      </div>
      <p className="text-xl font-normal italic text-textDark">No such party found!</p>
    </div>
  );
};

export default NotFoundPage;

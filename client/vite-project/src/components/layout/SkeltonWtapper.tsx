import React from "react";
import Skelton from "./Skelton";

export default function SkeltonWrapper() {
  const numberOfSkeltons = 12;

  return (
    <div className="grid grid-cols-4 w-full h-full ">
        {Array.from({ length: numberOfSkeltons }).map((_, index) => (
          <Skelton key={index} />
        ))}
    </div>
  );
}

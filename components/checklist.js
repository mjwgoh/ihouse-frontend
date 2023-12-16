import { useState } from "react";

export default function Checklist({ header, subheader = null, buttons }) {
  return (
    <div className="flex flex-col">
      <div className="flex w-full align-middle">
        <div className="flex w-full py-4 px-4 bg-white-100 text-black-900">
          {header}
        </div>
        <div className="flex flex-grow"></div>

        {buttons.map((button, index) => (
          <div
            className="flex w-1/5 py-4 px-4 bg-gray-700 text-white-100 hover:bg-black-900 hover:cursor-pointer"
            onClick={button.action}
            key={index}
          >
            {button.label}
          </div>
        ))}
      </div>
      {subheader &&
              <div className="flex w-full py-2 px-4 bg-gray-200 text-black-900">
              {subheader}
            </div>
      
      }
    </div>
  );
}

import { useState } from "react";

export default function EventChecklistItem({ buttons, checklistDetails }) {
  return (
    <div className="flex flex-col">
      <div className="flex w-full align-middle">
        <div className="flex flex-col w-full py-4 px-4 bg-white-100 text-black-900">
          {checklistDetails && (
            <div className="text-md flex">
              <div className="mr-2">{checklistDetails.title}</div>
              <div className="flex flex-grow">({checklistDetails.accessURL})</div>
              <div>{checklistDetails.step}</div>
            </div>
          )}
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
    </div>
  );
}

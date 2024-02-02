import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ dropdown_name, input_options, onSelect, activeValue = NaN }) {

  const [activeItem, setActiveItem] = useState(dropdown_name);

  const handleSelect = (option) => {
    setActiveItem(option);
    onSelect(option); // Call the passed onSelect function with the selected option
  };

  useEffect(() => {
    if (activeValue) {
      setActiveItem(activeValue);
    }
  }
  , [activeValue]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm border border-gray-200 text-white-100">
          {activeItem}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-white-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as="Fragment"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right bg-white-100 border border-white-100 focus:outline-none">
          {input_options.map(([option, option_url]) => (
            <div className="" key={option}>
              <Menu.Item>
                {({ active }) => (
                  <a
                  onClick={() => handleSelect(option)}
                  href={option_url}
                    className={classNames(
                      active ? "bg-primary text-white-100" : "text-black-200",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {option}
                  </a>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

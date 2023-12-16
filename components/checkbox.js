import { useState } from 'react';

export default function CheckboxList({ list, onInputChange }) {
  const [checkedState, setCheckedState] = useState(
    new Array(list.length).fill(false)
  );

  const handleInputChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    onInputChange(updatedCheckedState);
  };

  return (
    <div className='flex flex-col'>
      {list.map((item, index) => (
        <div key={index}>
          <label className='flex items-center p-3 border-b border-black-900 gap-3 bg-white-100 text-black-900'>
            <input
              type="checkbox"
              checked={checkedState[index]}
              onChange={() => handleInputChange(index)}
              className='form-checkbox h-5 w-5 text-black-900'
            />
            <div>
            {item}
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}
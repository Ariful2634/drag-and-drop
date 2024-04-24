/* eslint-disable react/prop-types */
import  { useState } from "react";

const NamePopup = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim() !== "") {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow">
        <p>Enter circle name:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-400 px-3 py-1 rounded mt-2"
        />
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSubmit}>
            Submit
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NamePopup;

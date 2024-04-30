/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const NamePopup = ({ onSubmit, onCancel, position, shape, dropboxName }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("selectCategory");
  const [nameError, setNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [showWarning, setShowWarning] = useState(false); // State for showing warning message

  const handleSubmit = () => {
    if (name.trim() === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }

    if (category === "selectCategory") {
      setTypeError("Type is required");
    } else {
      setTypeError("");
    }

    if (name.trim() !== "" && category !== "selectCategory") {
      let modifiedPosition = position.toString(); // Initialize modified position

      if (category === dropboxName) {
        if (category === "Source") {
          modifiedPosition = "S" + modifiedPosition;
        } else if (category === "Load") {
          modifiedPosition = "L" + modifiedPosition;
        }

        const apiUrl = "http://192.168.60.127:8085/add-source/";
        const requestBody = {
          source_name: name.trim(),
          source_type: category,
          position: modifiedPosition,
          shape: shape === "Circle" ? "circle" : "box"
        };

        axios
          .post(apiUrl, requestBody)
          .then((response) => {
            console.log("API Response:", response.data);
            onSubmit(name.trim(), shape);
          })
          .catch((error) => {
            console.error("API Error:", error);
          });
      } else {
        setShowWarning(true); // Show warning message
      }
    } else {
      console.log("Please select a valid type.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow">
        <p className="mb-2">Enter Type name:</p>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name here "
            className="border border-gray-400 px-3 py-1 rounded mr-2 flex-1"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-400 px-3 py-1 rounded"
          >
            <option value="selectCategory">Category</option>
            <option value="Source">Source</option>
            <option value="Load">Load</option>
          </select>
        </div>
        {nameError && <p className="text-red-500">{nameError}</p>}
        {typeError && <p className="text-red-500">{typeError}</p>}
        {showWarning && (
          <p className="text-red-500 font-bold pb-3">Please Change Category And Try Again.</p>
        )}
        <div className="flex justify-end">
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

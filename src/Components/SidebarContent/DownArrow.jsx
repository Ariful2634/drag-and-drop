/* eslint-disable react/prop-types */
// DownArrow.js
import { VscTriangleDown } from "react-icons/vsc";

const DownArrow = ({ onDragStart }) => {
  return (
    <div
    draggable
        onDragStart={(e) => onDragStart(e, "DownArrow")}
    >
      <h1 className="border-l-[3px] ml-9 border-green-600 h-[125px]"></h1>
      <VscTriangleDown
        className="absolute top-[343px] left-[72px] text-green-600 cursor-move"
      
      />
    </div>
  );
};

export default DownArrow;



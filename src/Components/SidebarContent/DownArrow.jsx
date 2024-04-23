/* eslint-disable react/prop-types */

import { VscTriangleDown } from "react-icons/vsc";

const DownArrow = ({ onDragStart }) => {
    return (
        <div
            className="flex justify-center items-center"
            draggable
            onDragStart={(e) => onDragStart(e, "DownArrow")}
        >
            <div className="relative">
                <h1 className="border-l-[3px] border-green-600 h-[100px]"></h1>
                <VscTriangleDown
                    className="absolute text-lg top-[93px] left-[-8px] text-green-600 cursor-move"
                />
            </div>
        </div>
    );
};

export default DownArrow;
/* eslint-disable react/prop-types */

import {  VscTriangleUp } from "react-icons/vsc";

const UpArrow = ({ onDragStart }) => {
    return (
        <div
            className="flex justify-center items-center"
            draggable
            onDragStart={(e) => onDragStart(e, "UpArrow")}
        >
            <div className="relative">
                <VscTriangleUp
                    className="absolute top-[-10px] text-lg left-[-8px] text-green-600 cursor-move"
                />
                <h1 className="border-l-[3px] border-green-600 h-[100px]"></h1>
            </div>
        </div>
    );
};

export default UpArrow ;
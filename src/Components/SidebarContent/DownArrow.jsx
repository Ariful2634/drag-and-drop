/* eslint-disable react/prop-types */
import { VscTriangleDown } from "react-icons/vsc";

const DownArrow = ({ onDragStart }) => {
    return (
        <div
            className="flex justify-center items-center"
            draggable
            onDragStart={(e) => onDragStart(e, "DownArrow")}
            style={{
                position: "relative",
                width: "30px", // Adjust width as needed
                height: "100px", // Adjust height as needed
            }}
        >
            <div
                className="absolute top-0 left-[9px] transform -translate-x-[-50%] bg-green-600"
                style={{
                    width: "3px", // Adjust line thickness as needed
                    height: "100%",
                }}
            ></div>
            <VscTriangleDown
                 className="absolute top-[93px] text-lg left-[3px] text-green-600 cursor-move"
            />
        </div>
    );
};

export default DownArrow;
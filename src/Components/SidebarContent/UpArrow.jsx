/* eslint-disable react/prop-types */
import { VscTriangleUp } from "react-icons/vsc";

const UpArrow = ({ onDragStart }) => {
    return (
        <div
            className="flex justify-center items-center"
            draggable
            onDragStart={(e) => onDragStart(e, "UpArrow")}
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
            <VscTriangleUp
                className="absolute top-[-10px] text-lg left-[3px] text-green-600 cursor-move"
            />
        </div>
    );
};

export default UpArrow;
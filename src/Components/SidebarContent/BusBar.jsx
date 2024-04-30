/* eslint-disable react/prop-types */


const BusBar = ({ onDragStart, index }) => {
    return (
        <div draggable onDragStart={(e) => onDragStart(e, { type: "Bus_Bar", index })}>
            <div className="min-w-[150px] max-w-[800px] h-[80px]  rounded-xl border-[3px] flex justify-center items-center border-green-600 relative">
                <h2>Total Live Power</h2>
            </div>
        </div>
    );
};

export default BusBar;
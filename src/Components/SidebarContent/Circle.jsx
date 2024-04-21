/* eslint-disable react/prop-types */


const Circle = ({ onDragStart }) => {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Circle")}
      >
        <div className="w-[120px] h-[120px] rounded-full border-4  flex justify-center items-center border-green-600">
          <div>
            <h2>Circle</h2>
          </div>
        </div>
      </div>
    );
  };

export default Circle;
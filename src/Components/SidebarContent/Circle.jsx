/* eslint-disable react/prop-types */

const Circle = ({ onDragStart, name }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Circle")}
    >
      <div className="w-[120px] h-[120px] rounded-full border-[3px]  flex justify-center items-center border-green-600">
        <div>
          <h2>{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Circle;

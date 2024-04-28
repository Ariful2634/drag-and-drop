/* eslint-disable react/prop-types */

const Rectangle = ({ onDragStart, index, name }) => {
  return (
    <div draggable onDragStart={(e) => onDragStart(e, { type: "Box", index })}>
      <div className="w-[120px] h-[110px]  rounded-xl border-[3px] flex justify-center items-center border-green-600 relative">
        <div>
            <h2 className="absolute inset-0 flex items-center justify-center">{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Rectangle;

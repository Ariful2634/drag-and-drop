
// eslint-disable-next-line react/prop-types
const Rectangle = ({ onDragStart }) => {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Rectangle")}
      >
        <div className="min-w-[170px] max-w-full h-[80px] rounded border-[3px] flex justify-center items-center bg-green-500  border-green-500">
          <div>
            <h2>Rectangle</h2>
          </div>
        </div>
      </div>
    );
  };
  

export default Rectangle;
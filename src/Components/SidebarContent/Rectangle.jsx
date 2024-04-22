
// eslint-disable-next-line react/prop-types
const Rectangle = ({ onDragStart }) => {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Rectangle")}
      >
        <div className="min-w-[170px] max-w-[500px] h-[80px] rounded border-4 flex justify-center items-center  border-green-600">
          <div>
            <h2>Rectangle</h2>
          </div>
        </div>
      </div>
    );
  };
  

export default Rectangle;
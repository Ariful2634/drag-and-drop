import { useState } from "react";
import Circle from "../SidebarContent/Circle";
import Rectangle from "../SidebarContent/Rectangle";

const Home = () => {
  const [droppedCircleItems, setDroppedCircleItems] = useState(Array(3).fill(null));
  const [droppedRectangleItems, setDroppedRectangleItems] = useState(Array(3).fill(null));
  const [isCircleDraggingOver, setIsCircleDraggingOver] = useState(false);
  const [isRectangleDraggingOver, setIsRectangleDraggingOver] = useState(false);
  const [nextEmptyCircleIndex, setNextEmptyCircleIndex] = useState(0);
  const [nextEmptyRectangleIndex, setNextEmptyRectangleIndex] = useState(0);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/react", JSON.stringify(item));
  };

  const handleDragEnd = () => {
    setIsCircleDraggingOver(false);
    setIsRectangleDraggingOver(false);
  };

  const handleCircleDragOver = (e) => {
    e.preventDefault();
    setIsCircleDraggingOver(true);
    setIsRectangleDraggingOver(false); // Ensure only circle dragging over is true
  };

  const handleRectangleDragOver = (e) => {
    e.preventDefault();
    setIsRectangleDraggingOver(true);
    setIsCircleDraggingOver(false); // Ensure only rectangle dragging over is true
  };

  const handleDragEnter = () => {
    setIsCircleDraggingOver(true);
    setIsRectangleDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsCircleDraggingOver(false);
    setIsRectangleDraggingOver(false);
  };

  const handleCircleDrop = (e, index) => {
    e.preventDefault();

    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));
    // Check if the dragged item is a circle
    if (draggedItem.type !== "Circle") {
      alert("Circle drop box can only contain circle items.");
      return;
    }

    // If there's already a dropped item at this index, prevent dropping again
    if (droppedCircleItems[index]) {
      alert("Already dropped a circle here. Cannot drop again.");
      return;
    }

    setDroppedCircleItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem; // Update the dropped item at the specified index
      return newItems;
    });
    setIsCircleDraggingOver(false); // Update dragging over state after drop
    setNextEmptyCircleIndex(index + 1); // Update the next empty circle index
    setIsCircleDraggingOver(false); // Hide border after drop
    setIsRectangleDraggingOver(false); // Hide border for rectangle drop boxes
  };

  const handleRectangleDrop = (e, index) => {
    e.preventDefault();

    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));
    // Check if the dragged item is a rectangle
    if (draggedItem.type !== "Rectangle") {
      alert("Rectangle drop box can only contain rectangle items.");
      return;
    }

    // If there's already a dropped item at this index, prevent dropping again
    if (droppedRectangleItems[index]) {
      alert("Already dropped a rectangle here. Cannot drop again.");
      return;
    }

    setDroppedRectangleItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem; // Update the dropped item at the specified index
      return newItems;
    });
    setIsRectangleDraggingOver(false); // Update dragging over state after drop
    setNextEmptyRectangleIndex(index + 1); // Update the next empty rectangle index
    setIsRectangleDraggingOver(false); // Hide border after drop
    setIsCircleDraggingOver(false); // Hide border for circle drop boxes
  };

  return (
    <div className="flex mx-auto" style={{ height: '100vh', width: '100vw' }}>
      <div className="w-64 min-h-screen bg-gray-200 flex justify-center" onDragOver={(e) => e.preventDefault()}>
        <div className="space-y-3">
          <div className="w-full flex justify-center">
            <Circle onDragStart={(e) => handleDragStart(e, { type: "Circle" })} onDragEnd={handleDragEnd} />
          </div>
          <div>
            <Rectangle onDragStart={(e) => handleDragStart(e, { type: "Rectangle" })} onDragEnd={handleDragEnd} />
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 ml-16" onDragOver={handleDragEnter} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
        <div className="" style={{ position: 'relative' }}>
          <div className="flex">
            {droppedCircleItems.map((item, index) => (
              <div
                key={`circle-drop-${index}`}
                className="border border-dashed border-black p-4 m-2"
                onDrop={(e) => handleCircleDrop(e, index)}
                onDragOver={(e) => handleCircleDragOver(e)}
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: isCircleDraggingOver && index === nextEmptyCircleIndex ? '2px dashed black' : 'none', // Update border style based on dragging over and index
                }}
              >
                {item && <Circle />}
              </div>
            ))}
          </div>
          <div className="flex">
            {droppedRectangleItems.map((item, index) => (
              <div
                key={`rectangle-drop-${index}`}
                className="border border-dashed border-black p-4 m-2"
                onDrop={(e) => handleRectangleDrop(e, index)}
                onDragOver={(e) => handleRectangleDragOver(e)}
                style={{
                  width: '200px',
                  height: '150px',
                  border: isRectangleDraggingOver && index === nextEmptyRectangleIndex ? '2px dashed black' : 'none', // Update border style based on dragging over and index
                }}
              >
                {item && <Rectangle />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

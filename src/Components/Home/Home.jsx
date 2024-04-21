import { useState } from "react";
import Circle from "../SidebarContent/Circle";
import Rectangle from "../SidebarContent/Rectangle";

const Home = () => {
  const [droppedCircleItems1, setDroppedCircleItems1] = useState(Array(3).fill(null));
  const [droppedCircleItems2, setDroppedCircleItems2] = useState(Array(3).fill(null));
  const [droppedRectangleItems, setDroppedRectangleItems] = useState(Array(3).fill(null));
  const [isCircleDraggingOver1, setIsCircleDraggingOver1] = useState(false);
  const [isCircleDraggingOver2, setIsCircleDraggingOver2] = useState(false);
  const [isRectangleDraggingOver, setIsRectangleDraggingOver] = useState(false);
  const [nextEmptyCircleIndex1, setNextEmptyCircleIndex1] = useState(0);
  const [nextEmptyCircleIndex2, setNextEmptyCircleIndex2] = useState(0);
  const [nextEmptyRectangleIndex, setNextEmptyRectangleIndex] = useState(0);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/react", JSON.stringify(item));
  };

  const handleDragEnd = () => {
    setIsCircleDraggingOver1(false);
    setIsCircleDraggingOver2(false);
    setIsRectangleDraggingOver(false);
  };

  const handleCircleDragOver1 = (e) => {
    e.preventDefault();
    setIsCircleDraggingOver1(true);
    setIsCircleDraggingOver2(false);
    setIsRectangleDraggingOver(false);
  };

  const handleCircleDragOver2 = (e) => {
    e.preventDefault();
    setIsCircleDraggingOver2(true);
    setIsCircleDraggingOver1(false);
    setIsRectangleDraggingOver(false);
  };

  const handleRectangleDragOver = (e) => {
    e.preventDefault();
    setIsRectangleDraggingOver(true);
    setIsCircleDraggingOver1(false);
    setIsCircleDraggingOver2(false);
  };

  const handleDragEnter = () => {
    setIsCircleDraggingOver1(true);
    setIsCircleDraggingOver2(true);
    setIsRectangleDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsCircleDraggingOver1(false);
    setIsCircleDraggingOver2(false);
    setIsRectangleDraggingOver(false);
  };

  const handleCircleDrop1 = (e, index) => {
    e.preventDefault();

    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));
    // Check if the dragged item is a circle
    if (draggedItem.type !== "Circle") {
      alert("Circle drop box can only contain circle items.");
      return;
    }

    // If there's already a dropped item at this index, prevent dropping again
    if (droppedCircleItems1[index]) {
      alert("Already dropped a circle here. Cannot drop again.");
      return;
    }

    setDroppedCircleItems1((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem; // Update the dropped item at the specified index
      return newItems;
    });
    setIsCircleDraggingOver1(false); // Update dragging over state after drop
    setNextEmptyCircleIndex1(index + 1); // Update the next empty circle index
    setIsCircleDraggingOver1(false); // Hide border after drop
    setIsCircleDraggingOver2(false); // Hide border for the second circle drop box
    setIsRectangleDraggingOver(false); // Hide border for rectangle drop boxes
  };

  const handleCircleDrop2 = (e, index) => {
    e.preventDefault();

    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));
    // Check if the dragged item is a circle
    if (draggedItem.type !== "Circle") {
      alert("Circle drop box can only contain circle items.");
      return;
    }

    // If there's already a dropped item at this index, prevent dropping again
    if (droppedCircleItems2[index]) {
      alert("Already dropped a circle here. Cannot drop again.");
      return;
    }

    setDroppedCircleItems2((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem; // Update the dropped item at the specified index
      return newItems;
    });
    setIsCircleDraggingOver2(false); // Update dragging over state after drop
    setNextEmptyCircleIndex2(index + 1); // Update the next empty circle index
    setIsCircleDraggingOver1(false); // Hide border for the first circle drop box
    setIsCircleDraggingOver2(false); // Hide border after drop
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
    setIsCircleDraggingOver1(false); // Hide border for the first circle drop box
    setIsCircleDraggingOver2(false); // Hide border for the second circle drop box
    setIsRectangleDraggingOver(false); // Hide border after drop
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
            {droppedCircleItems1.map((item, index) => (
              <div
                key={`circle-drop1-${index}`}
                className="border border-dashed border-black p-4 m-2"
                onDrop={(e) => handleCircleDrop1(e, index)}
                onDragOver={(e) => handleCircleDragOver1(e)}
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: isCircleDraggingOver1 && index === nextEmptyCircleIndex1 ? '2px dashed black' : 'none', // Update border style based on dragging over and index
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

          <div className="flex">
            {droppedCircleItems2.map((item, index) => (
              <div
                key={`circle-drop2-${index}`}
                className="border border-dashed border-black p-4 m-2"
                onDrop={(e) => handleCircleDrop2(e, index)}
                onDragOver={(e) => handleCircleDragOver2(e)}
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  border: isCircleDraggingOver2 && index === nextEmptyCircleIndex2 ? '2px dashed black' : 'none', // Update border style based on dragging over and index
                }}
              >
                {item && <Circle />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

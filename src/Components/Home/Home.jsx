import { useState, useEffect } from "react";
import Circle from "../SidebarContent/Circle";
import Rectangle from "../SidebarContent/Rectangle";
import DownArrow from "../SidebarContent/DownArrow";
import UpArrow from "../SidebarContent/UpArrow";


const Home = () => {
  const [droppedTopCircleItems, setDroppedTopCircleItems] = useState(Array(3).fill(null));
  const [hoveredTopCircleIndex, setHoveredTopCircleIndex] = useState([]);
  const [selectedTopCircleItem, setSelectedTopCircleItem] = useState(null);

  const [droppedBottomCircleItems, setDroppedBottomCircleItems] = useState(Array(3).fill(null));
  const [hoveredBottomCircleIndex, setHoveredBottomCircleIndex] = useState([]);
  const [selectedBottomCircleItem, setSelectedBottomCircleItem] = useState(null);

  const [droppedRectangleItems, setDroppedRectangleItems] = useState(Array(1).fill(null));
  const [hoveredRectangleIndex, setHoveredRectangleIndex] = useState([]);
  const [selectedRectangleItem, setSelectedRectangleItem] = useState(null);

  const [droppedDownArrowItems, setDroppedDownArrowItems] = useState(Array(3).fill(null));
  const [hoveredDownArrowIndex, setHoveredDownArrowIndex] = useState([]);
  const [selectedDownArrowItem, setSelectedDownArrowItem] = useState(null);

  const [droppedUpArrowItems, setDroppedUpArrowItems] = useState(Array(3).fill(null));
  const [hoveredUpArrowIndex, setHoveredUpArrowIndex] = useState([]);
  const [selectedUpArrowItem, setSelectedUpArrowItem] = useState(null);

  useEffect(() => {
    const handleDragEndOutside = () => {
      setHoveredTopCircleIndex([]);
      setHoveredBottomCircleIndex([]);
      setHoveredRectangleIndex([]);
      setHoveredDownArrowIndex([]);
      setHoveredUpArrowIndex([]);
    };

    document.addEventListener("dragend", handleDragEndOutside);

    return () => {
      document.removeEventListener("dragend", handleDragEndOutside);
    };
  }, []);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("application/react", JSON.stringify(item));
  };

  const handleDragEnd = () => {
    setHoveredTopCircleIndex([]);
    setHoveredBottomCircleIndex([]);
    setHoveredRectangleIndex([]);
    setHoveredDownArrowIndex([]);
    setHoveredUpArrowIndex([]);
  };

  // for circle
  const handleCircleDragOver = (e) => {
    e.preventDefault();
    const firstEmptyTopIndex = droppedTopCircleItems.findIndex((item) => item === null);
    const firstEmptyBottomIndex = droppedBottomCircleItems.findIndex((item) => item === null);
    let nextFilledTopIndex = -1;
    let nextFilledBottomIndex = -1;
    for (let i = droppedTopCircleItems.length - 1; i >= 0; i--) {
      if (droppedTopCircleItems[i] !== null) {
        nextFilledTopIndex = i + 1;
        break;
      }
    }
    for (let i = droppedBottomCircleItems.length - 1; i >= 0; i--) {
      if (droppedBottomCircleItems[i] !== null) {
        nextFilledBottomIndex = i + 1;
        break;
      }
    }
    setHoveredTopCircleIndex([firstEmptyTopIndex, nextFilledTopIndex]);
    setHoveredBottomCircleIndex([firstEmptyBottomIndex, nextFilledBottomIndex]);
  };

  // for rectangle
  const handleRectangleDragOver = (e) => {
    e.preventDefault();
    const firstEmptyIndex = droppedRectangleItems.findIndex((item) => item === null);
    let nextFilledIndex = -1;
    for (let i = droppedRectangleItems.length - 1; i >= 0; i--) {
      if (droppedRectangleItems[i] !== null) {
        nextFilledIndex = i + 1;
        break;
      }
    }
    setHoveredRectangleIndex([firstEmptyIndex, nextFilledIndex]);
  };

  // for down arrow
  const handleDownArrowDragOver = (e) => {
    e.preventDefault();
    const firstEmptyIndex = droppedDownArrowItems.findIndex((item) => item === null);
    let nextFilledIndex = -1;
    for (let i = droppedDownArrowItems.length - 1; i >= 0; i--) {
      if (droppedDownArrowItems[i] !== null) {
        nextFilledIndex = i + 1;
        break;
      }
    }
    setHoveredDownArrowIndex([firstEmptyIndex, nextFilledIndex]);
  };

  // for up arrow
  const handleUpArrowDragOver = (e) => {
    e.preventDefault();
    const firstEmptyIndex = droppedUpArrowItems.findIndex((item) => item === null);
    let nextFilledIndex = -1;
    for (let i = droppedUpArrowItems.length - 1; i >= 0; i--) {
      if (droppedUpArrowItems[i] !== null) {
        nextFilledIndex = i + 1;
        break;
      }
    }
    setHoveredUpArrowIndex([firstEmptyIndex, nextFilledIndex]);
  };

  const handleDrop = (e, index, type) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));
    if (draggedItem.type !== "Circle") {
      alert("Circle drop box can only contain circle items.");
      return;
    }
    if (type === "top") {
      setDroppedTopCircleItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = draggedItem;
        return newItems;
      });
    } else if (type === "bottom") {
      setDroppedBottomCircleItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = draggedItem;
        return newItems;
      });
    }
    setHoveredTopCircleIndex([]);
    setHoveredBottomCircleIndex([]);
  };

  const handleRectangleDrop = (e, index) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));
    if (draggedItem.type !== "Rectangle") {
      alert("Rectangle drop box can only contain rectangle items.");
      return;
    }
    setDroppedRectangleItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem;
      return newItems;
    });
    setHoveredRectangleIndex([]);
  };

  const handleDownArrowDrop = (e, index) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));
    if (draggedItem.type !== "DownArrow") {
      alert("Down arrow drop box can only contain down arrow items.");
      return;
    }
    setDroppedDownArrowItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem;
      return newItems;
    });
    setHoveredDownArrowIndex([]);
  };

  const handleUpArrowDrop = (e, index) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));
    if (draggedItem.type !== "UpArrow") {
      alert(" arrow drop box can only contain down arrow items.");
      return;
    }
    setDroppedUpArrowItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem;
      return newItems;
    });
    setHoveredUpArrowIndex([]);
  };

  const handleDeleteTopCircle = () => {
    if (!selectedTopCircleItem) return;
    const index = droppedTopCircleItems.indexOf(selectedTopCircleItem);
    if (index !== -1) {
      const newItems = [...droppedTopCircleItems];
      newItems[index] = null;
      setDroppedTopCircleItems(newItems);
    }
    setSelectedTopCircleItem(null);
  };

  const handleDeleteBottomCircle = () => {
    if (!selectedBottomCircleItem) return;
    const index = droppedBottomCircleItems.indexOf(selectedBottomCircleItem);
    if (index !== -1) {
      const newItems = [...droppedBottomCircleItems];
      newItems[index] = null;
      setDroppedBottomCircleItems(newItems);
    }
    setSelectedBottomCircleItem(null);
  };

  const handleDeleteRectangle = () => {
    if (!selectedRectangleItem) return;
    const index = droppedRectangleItems.indexOf(selectedRectangleItem);
    if (index !== -1) {
      const newItems = [...droppedRectangleItems];
      newItems[index] = null;
      setDroppedRectangleItems(newItems);
    }
    setSelectedRectangleItem(null);
  };

  const handleDeleteDownArrow = () => {
    if (!selectedDownArrowItem) return;
    const index = droppedDownArrowItems.indexOf(selectedDownArrowItem);
    if (index !== -1) {
      const newItems = [...droppedDownArrowItems];
      newItems[index] = null;
      setDroppedDownArrowItems(newItems);
    }
    setSelectedDownArrowItem(null);
  };

  const handleDeleteUpArrow = () => {
    if (!selectedUpArrowItem) return;
    const index = droppedDownArrowItems.indexOf(selectedUpArrowItem);
    if (index !== -1) {
      const newItems = [...droppedDownArrowItems];
      newItems[index] = null;
      setHoveredUpArrowIndex(newItems);
    }
    setSelectedUpArrowItem(null);
  };

  return (
    <div className="flex mx-auto" style={{ height: "100vh", width: "100vw" }}>
      <div className="min-w-64 min-h-screen bg-gray-200 flex justify-center">
        <div className="space-y-3">
          <div className="w-full flex justify-center" onDragOver={handleCircleDragOver}>
            <Circle onDragStart={(e) => handleDragStart(e, { type: "Circle" })} onDragEnd={handleDragEnd} />
          </div>
          <div className="flex items-center space-x-10 justify-center">
            <div className=" " onDragOver={handleDownArrowDragOver}>
              <DownArrow onDragStart={(e) => handleDragStart(e, { type: "DownArrow" })} />
            </div>
            <div className="" onDragOver={handleUpArrowDragOver}>
              <UpArrow onDragStart={(e) => handleDragStart(e, { type: "UpArrow" })} />
            </div>
          </div>
          <div className="w-full flex justify-center" onDragOver={handleRectangleDragOver}>
            <Rectangle onDragStart={(e) => handleDragStart(e, { type: "Rectangle" })} onDragEnd={handleDragEnd} />
          </div>
        </div>
      </div>
      <div className="flex-1 ">
        <div style={{ position: "relative" }}>
          <div className="flex">
            {droppedTopCircleItems.map((item, index) => (
              <div
                key={`top-circle-drop-${index}`}
                className="border border-dashed border-black p-4 m-2"
                onDrop={(e) => handleDrop(e, index, "top")}
                onDragOver={(e) => handleCircleDragOver(e)}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  border: hoveredTopCircleIndex.includes(index) ? "2px dashed black" : "2px dashed transparent",
                }}
                onClick={() => setSelectedTopCircleItem(item)}
              >
                {item && <Circle />}
              </div>
            ))}
          </div>
          <div className="flex">
            {droppedDownArrowItems.map((item, index) => (
              <div
                key={`down-arrow-drop-${index}`}
                className="border border-dashed border-black p-4 mx-[8.5px] -mt-[40px]"
                onDrop={(e) => handleDownArrowDrop(e, index)}
                onDragOver={(e) => handleDownArrowDragOver(e)}
                style={{
                  width: "150px",
                  height: "150px",
                  border: hoveredDownArrowIndex.includes(index) ? "2px dashed black" : "2px dashed transparent",
                }}
                onClick={() => setSelectedDownArrowItem(item)}
              >
                {item && <DownArrow />}
              </div>
            ))}
          </div>
          <div className="flex">
            {droppedRectangleItems.map((item, index) => (
              <div
                key={`rectangle-drop-${index}`}
                className="border border-dashed border-black p-4 m-2 -mt-[43px]"
                onDrop={(e) => handleRectangleDrop(e, index)}
                onDragOver={(e) => handleRectangleDragOver(e)}
                style={{
                  width: "495px",
                  height: "150px",
                  borderRadius: "0%",
                  border: hoveredRectangleIndex.includes(index) ? "2px dashed black" : "2px dashed transparent",
                }}
                onClick={() => setSelectedRectangleItem(item)}
              >
                {item && <Rectangle />}
              </div>
            ))}
          </div>
          <div className="flex">
            {droppedUpArrowItems.map((item, index) => (
              <div
                key={`up-arrow-drop-${index}`}
                className="border border-dashed border-black p-4 m-2 -mt-[72px]"
                onDrop={(e) => handleUpArrowDrop(e, index)}
                onDragOver={(e) => handleUpArrowDragOver(e)}
                style={{
                  width: "150px",
                  height: "150px",
                  border: hoveredUpArrowIndex.includes(index) ? "2px dashed black" : "2px dashed transparent",
                }}
                onClick={() => setSelectedUpArrowItem(item)}
              >
                {item && <UpArrow />}
              </div>
            ))}
          </div>
          <div className="flex">
            {droppedBottomCircleItems.map((item, index) => (
              <div
                key={`bottom-circle-drop-${index}`}
                className="border border-dashed border-black p-4 mx-2 -mt-[58px]"
                onDrop={(e) => handleDrop(e, index, "bottom")}
                onDragOver={(e) => handleCircleDragOver(e)}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  border: hoveredBottomCircleIndex.includes(index) ? "2px dashed black" : "2px dashed transparent",
                }}
                onClick={() => setSelectedBottomCircleItem(item)}
              >
                {item && <Circle />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Popup for Top Circle */}
      {selectedTopCircleItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <p>Are you sure you want to delete this top circle item?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDeleteTopCircle}>
                Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedTopCircleItem(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Popup for Bottom Circle */}
      {selectedBottomCircleItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <p>Are you sure you want to delete this bottom circle item?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDeleteBottomCircle}>
                Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedBottomCircleItem(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Popup for Rectangles */}
      {selectedRectangleItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <p>Are you sure you want to delete this rectangle item?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDeleteRectangle}>
                Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedRectangleItem(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Popup for Down Arrows */}
      {selectedDownArrowItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <p>Are you sure you want to delete this down arrow item?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDeleteDownArrow}>
                Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedDownArrowItem(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Popup for Down Arrows */}
      {selectedUpArrowItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <p>Are you sure you want to delete this up arrow item?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDeleteUpArrow}>
                Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedUpArrowItem(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import Circle from "../SidebarContent/Circle";
import Rectangle from "../SidebarContent/Rectangle";

const Home = () => {
  const [droppedCircleItemsTop, setDroppedCircleItemsTop] = useState(Array(6).fill(null));
  const [droppedCircleItemsBottom, setDroppedCircleItemsBottom] = useState(Array(6).fill(null));
  const [droppedRectangleItems, setDroppedRectangleItems] = useState(Array(2).fill(null));
  const [hoveredCircleIndexTop, setHoveredCircleIndexTop] = useState(null);
  const [hoveredCircleIndexBottom, setHoveredCircleIndexBottom] = useState(null);
  const [hoveredRectangleIndex, setHoveredRectangleIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragEndOutside = () => {
      setIsDragging(false);
      setHoveredCircleIndexTop(null);
      setHoveredCircleIndexBottom(null);
      setHoveredRectangleIndex(null);
    };

    document.addEventListener("dragend", handleDragEndOutside);

    return () => {
      document.removeEventListener("dragend", handleDragEndOutside);
    };
  }, []);

  const handleDragStart = (e, item) => {
    setIsDragging(true);
    e.dataTransfer.setData("application/react", JSON.stringify(item));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setHoveredCircleIndexTop(null);
    setHoveredCircleIndexBottom(null);
    setHoveredRectangleIndex(null);
  };

  const handleCircleDragOverTop = (e) => {
    e.preventDefault();
    const firstEmptyIndex = droppedCircleItemsTop.findIndex((item) => item === null);
    if (firstEmptyIndex !== -1) {
      setHoveredCircleIndexTop(firstEmptyIndex);
    } else {
      setHoveredCircleIndexTop(-1); // Set to -1 to indicate that no empty dropbox is available
    }
  };

  const handleCircleDragOverBottom = (e) => {
    e.preventDefault();
    const firstEmptyIndex = droppedCircleItemsBottom.findIndex((item) => item === null);
    if (firstEmptyIndex !== -1) {
      setHoveredCircleIndexBottom(firstEmptyIndex);
    } else {
      setHoveredCircleIndexBottom(-1); // Set to -1 to indicate that no empty dropbox is available
    }
  };

  const handleRectangleDragOver = (e) => {
    e.preventDefault();
    const firstEmptyIndex = droppedRectangleItems.findIndex((item) => item === null);
    if (firstEmptyIndex !== -1) {
      setHoveredRectangleIndex(firstEmptyIndex);
    } else {
      setHoveredRectangleIndex(-1); // Set to -1 to indicate that no empty dropbox is available
    }
  };

  const handleCircleDropTop = (e, index) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));

    if (draggedItem.type !== "Circle") {
      alert("Circle drop box can only contain circle items.");
      return;
    }

    if (droppedCircleItemsTop[index]) {
      alert("This drop box already contains an item. Please choose another drop box.");
      return;
    }

    setDroppedCircleItemsTop((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem;
      return newItems;
    });
    setHoveredCircleIndexTop(null);
  };

  const handleCircleDropBottom = (e, index) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));

    if (draggedItem.type !== "Circle") {
      alert("Circle drop box can only contain circle items.");
      return;
    }

    if (droppedCircleItemsBottom[index]) {
      alert("This drop box already contains an item. Please choose another drop box.");
      return;
    }

    setDroppedCircleItemsBottom((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem;
      return newItems;
    });
    setHoveredCircleIndexBottom(null);
  };

  const handleRectangleDrop = (e, index) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));

    if (draggedItem.type !== "Rectangle") {
      alert("Rectangle drop box can only contain rectangle items.");
      return;
    }

    if (droppedRectangleItems[index]) {
      alert("This drop box already contains an item. Please choose another drop box.");
      return;
    }

    setDroppedRectangleItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem;
      return newItems;
    });
    setHoveredRectangleIndex(null);
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    if (selectedItem.type === "Circle") {
      const indexTop = droppedCircleItemsTop.indexOf(selectedItem);
      if (indexTop !== -1) {
        const newItemsTop = [...droppedCircleItemsTop];
        newItemsTop[indexTop] = null;
        setDroppedCircleItemsTop(newItemsTop);
      }

      const indexBottom = droppedCircleItemsBottom.indexOf(selectedItem);
      if (indexBottom !== -1) {
        const newItemsBottom = [...droppedCircleItemsBottom];
        newItemsBottom[indexBottom] = null;
        setDroppedCircleItemsBottom(newItemsBottom);
      }
    } else if (selectedItem.type === "Rectangle") {
      const index = droppedRectangleItems.indexOf(selectedItem);
      if (index !== -1) {
        const newItems = [...droppedRectangleItems];
        newItems[index] = null;
        setDroppedRectangleItems(newItems);
      }
    }
    setSelectedItem(null);
  };

  return (
    <div className="flex mx-auto" style={{ height: '100vh', width: '100vw' }}>
      <div className="min-w-64 min-h-screen bg-gray-200 flex justify-center" onDragOver={handleCircleDragOverTop}>
        <div className="space-y-3">
          <div className="w-full flex justify-center">
            <Circle onDragStart={(e) => handleDragStart(e, { type: "Circle" })} onDragEnd={handleDragEnd} />
          </div>
          <div className="w-full flex justify-center">
            <Rectangle onDragStart={(e) => handleDragStart(e, { type: "Rectangle" })} onDragEnd={handleDragEnd} />
          </div>
        </div>
      </div>

      <div className="flex-1 pt-6">
        <div className="" style={{ position: 'relative' }}>
          <div className="flex ">
            {droppedCircleItemsTop.map((item, index) => (
              <div
                key={`circle-drop-top-${index}`}
                className="border border-dashed border-black p-4 mx-2 mb-2"
                onDrop={(e) => handleCircleDropTop(e, index)}
                onDragOver={(e) => handleCircleDragOverTop(e)}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%', // Circular shape
                  border: hoveredCircleIndexTop === index && hoveredCircleIndexTop !== -1 && isDragging ? '2px dashed black' : '2px dashed transparent',
                }}
                onClick={() => setSelectedItem(item)}
              >
                {item && <Circle />}
              </div>
            ))}
          </div>
          <div className="flex ">
            {droppedRectangleItems.map((item, index) => (
              <div
                key={`rectangle-drop-${index}`}
                className="border border-dashed border-black p-4 mx-2 mt-4"
                onDrop={(e) => handleRectangleDrop(e, index)}
                onDragOver={(e) => handleRectangleDragOver(e)}
                style={{
                  width: '495px',
                  height: '150px',
                  borderRadius: '0%', // Rectangular shape
                  border: hoveredRectangleIndex === index && hoveredRectangleIndex !== -1 && isDragging ? '2px dashed black' : '2px dashed transparent',
                }}
                onClick={() => setSelectedItem(item)}
              >
                {item && <Rectangle />}
              </div>
            ))}
          </div>
          <div className="flex ">
            {droppedCircleItemsBottom.map((item, index) => (
              <div
                key={`circle-drop-bottom-${index}`}
                className="border border-dashed border-black p-4 mx-2 -mt-4"
                onDrop={(e) => handleCircleDropBottom(e, index)}
                onDragOver={(e) => handleCircleDragOverBottom(e)}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%', // Circular shape
                  border: hoveredCircleIndexBottom === index && hoveredCircleIndexBottom !== -1 && isDragging ? '2px dashed black' : '2px dashed transparent',
                }}
                onClick={() => setSelectedItem(item)}
              >
                {item && <Circle />}
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDelete}>Delete</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

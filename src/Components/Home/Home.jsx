import { useState, useEffect } from "react";
import Circle from "../SidebarContent/Circle";
import NamePopup from "../SidebarContent/NamePopup";
import { Link } from "react-router-dom";
import Rectangle from "../SidebarContent/Rectangle";

const Home = () => {
  const [droppedItems, setDroppedItems] = useState(Array(8).fill(null));
  const [hoveredIndex, setHoveredIndex] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [draggedItemType, setDraggedItemType] = useState(null); // State to store dragged item type

  useEffect(() => {
    const handleDragEndOutside = () => {
      setHoveredIndex([]);
    };

    document.addEventListener("dragend", handleDragEndOutside);

    return () => {
      document.removeEventListener("dragend", handleDragEndOutside);
    };
  }, []);

  const handleDragStart = (e, item, itemType) => {
    e.dataTransfer.setData("application/react", JSON.stringify(item));
    setDraggedItemType(itemType); // Store dragged item type
  };

  const handleDragEnd = () => {
    setHoveredIndex([]);
  };

  const handleCircleDragOver = (e) => {
    e.preventDefault();
    const firstEmptyIndex = droppedItems.findIndex((item) => item === null);
    let nextFilledIndex = -1;
    for (let i = droppedItems.length - 1; i >= 0; i--) {
      if (droppedItems[i] !== null) {
        nextFilledIndex = i + 1;
        break;
      }
    }
    setHoveredIndex([firstEmptyIndex, nextFilledIndex]);
  };

  const handleRectangleDragOver = (e) => {
    e.preventDefault();
    const firstEmptyIndex = droppedItems.findIndex((item) => item === null);
    let nextFilledIndex = -1;
    for (let i = droppedItems.length - 1; i >= 0; i--) {
      if (droppedItems[i] !== null) {
        nextFilledIndex = i + 1;
        break;
      }
    }
    setHoveredIndex([firstEmptyIndex, nextFilledIndex]);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/react"));
    setDroppedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = draggedItem;
      return newItems;
    });
    setHoveredIndex([]);
    setShowPopup(true);
    setPopupIndex(index);
  };

  const handleDeleteItem = () => {
    if (!selectedItem) return;
    const index = droppedItems.indexOf(selectedItem);
    if (index !== -1) {
      const newItems = [...droppedItems];
      newItems[index] = null;
      setDroppedItems(newItems);
    }
    setSelectedItem(null);
  };

  const handleSubmitPopup = (name) => {
    const index = popupIndex;
    if (index !== null) {
      setDroppedItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = { ...newItems[index], name };
        return newItems;
      });
      setShowPopup(false);
      setPopupIndex(null);
    }
  };

  const handleCancelPopup = () => {
    const index = popupIndex;
    if (index !== null) {
      setDroppedItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index] = null;
        return newItems;
      });
      setShowPopup(false);
      setPopupIndex(null);
    }
  };

  return (
    <div className="flex mx-auto" style={{ height: "100vh", width: "100vw" }}>
      <div className="min-w-[220px] min-h-screen bg-gray-200 flex justify-center">
        <div className="space-y-3">
          <div className="w-full flex justify-center" onDragOver={handleCircleDragOver}>
            <Circle onDragStart={(e) => handleDragStart(e, { type: "Circle" }, "Circle")} onDragEnd={handleDragEnd} />
          </div>
          <div className="w-full flex justify-center" onDragOver={handleRectangleDragOver}>
            <Rectangle onDragStart={(e) => handleDragStart(e, { type: "Box" }, "Box")} onDragEnd={handleDragEnd} />
          </div>

          <div className="w-full flex justify-center">
            <Link to='/viewPage'><button className="btn btn-accent">View Page</button></Link>
          </div>
        </div>
      </div>

      <div className="flex-1 pl-4 pt-4 ">
        <div style={{ position: "relative" }}>
          <div className="flex space-x-10">
            {droppedItems.map((item, index) => (
              <div
                key={`dropped-item-${index}`}
                className="border border-dashed  border-black"
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  width: "120px",
                  height: "120px",
                  border: hoveredIndex.includes(index) ? "2px dashed black" : "2px dashed transparent",
                }}
                onClick={() => setSelectedItem(item)}
              >
                {item && item.type === "Circle" && <Circle name={item.name} />}
                {item && item.type === "Box" && <Rectangle className="pl-10" name={item.name} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPopup && (
        <NamePopup
          onSubmit={(name) => handleSubmitPopup(name)}
          onCancel={() => {
            setShowPopup(false);
            setPopupIndex(null);
            handleCancelPopup();
          }}
          position={popupIndex} // Pass the index as the position prop
          shape={draggedItemType} // Pass the dragged item type as the shape prop
        />
      )}

      {selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDeleteItem}>
                Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedItem(null)}>
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
import { useState, useEffect, useRef } from "react";
import Circle from "../SidebarContent/Circle";
import Rectangle from "../SidebarContent/Rectangle";
import NamePopup from "../SidebarContent/NamePopup";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Define the useInterval hook
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Home = () => {
  const [droppedItems, setDroppedItems] = useState(Array(8).fill(null));
  const [hoveredIndex, setHoveredIndex] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [draggedItemType, setDraggedItemType] = useState(null);
  const [loading, setLoading] = useState(true);


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
    setDraggedItemType(itemType); // Set the dragged item type here
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

    // Log the type of the dragged item to console
    console.log("Dragged Item Type:", draggedItem.type);

    // Set the shape based on the dragged item type
    const shape = draggedItem.type === "Circle" ? "circle" : "box";

    setDroppedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = { ...draggedItem, shape }; // Include the shape in the dropped item
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

  // ----------------showing the popup after drop----------------------

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


  // ----------------------------- fetch the data-------------------------------

  const queryClient = useQueryClient(); // Initialize queryClient
  const { data: getSource = [] } = useQuery({
    queryKey: ['getSource'],
    queryFn: async () => {
      const res = await axios.get('http://192.168.60.127:8085/get-source-info/');
      return res.data;
    }
  });



  // Refresh data every 2 seconds
  useInterval(() => {
    fetchData();
  }, 2000);


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSource]);


  const fetchData = async () => {
    try {
      const newItems = Array(8).fill(null); // Initialize an array to hold fetched items
      await Promise.all(getSource.map(async (source) => {
        const { source_name, position } = source;
        if (source_name && position && position.startsWith("S")) { // Ensure position starts with "S"
          const index = parseInt(position.substring(1)); // Extract index from position
          newItems[index] = { ...source }; // Push source info to corresponding index
        }
      }));
      setDroppedItems(newItems); // Update droppedItems array with source info
      setLoading(false);
      // Manually invalidate the cache to trigger a refetch
      queryClient.invalidateQueries("getSource");
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex mx-auto" style={{ height: "100vh", width: "100vw" }}>

      {/* -------------showing item on sidebar------------------------------ */}
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

      {/* -----------------dropbox functionality----------------------------- */}
      <div className="flex-1 pl-4 pt-4 ">
        <div style={{ position: "relative" }}>
          <div className="flex space-x-10">
            {droppedItems.map((item, index) => (
              <div
                key={`dropped-item-${index}`}
                className="border border-dashed border-black"
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  width: "120px",
                  height: "120px",
                  border: hoveredIndex.includes(index) ? "2px dashed black" : "2px dashed transparent",
                  pointerEvents: "auto",
                }}
                onClick={() => setSelectedItem(item)}
              >
                {/* Render the source info */}
                {item && (
                  <div key={item?.position}>
                    {
                      (!item?.shape || item?.shape === 'circle') ? (
                        <div key={index} className="flex-shrink-0 w-[120px] h-[120px] rounded-full border-[3px] flex justify-center items-center border-green-600 relative">
                          <div className="absolute top-0 right-0 bg-white rounded-full p-1">
                            {item.position}
                          </div>
                          <div className="text-center">
                            <h2 className="text-sm font-semibold">{item?.source_name}</h2>
                            <h2 className="text-sm">{item?.source_type}</h2>
                            <p className="text-xs">{item?.position}</p>
                            {/* {latestPowerValue !== undefined && (
                                      <p className="text-xs">Power: {latestPowerValue}</p>
                                  )} */}
                          </div>
                        </div>
                      ) : (
                        <div key={index} className="flex-shrink-0 w-[120px] h-[120px] rounded border-[3px] flex justify-center items-center border-green-600 relative">
                          <div className="absolute top-0 right-0 bg-white rounded-full p-1">
                            {item?.position}
                          </div>
                          <div className="text-center">
                            <h2 className="text-sm font-semibold">{item?.source_name}</h2>
                            <h2 className="text-sm">{item?.source_type}</h2>
                            <p className="text-xs">{item?.position}</p>
                            {/* {latestPowerValue !== undefined && (
                                      <p className="text-xs">Power: {latestPowerValue}</p>
                                  )} */}
                          </div>
                        </div>
                      )
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------showing the pop up---------------------------- */}
      {showPopup && (
        <NamePopup
          onSubmit={(name) => handleSubmitPopup(name)}
          onCancel={() => {
            setShowPopup(false);
            setPopupIndex(null);
            handleCancelPopup();
          }}
          position={popupIndex}
          shape={draggedItemType}
        />
      )}

      {/* ----------------delete dropbox item----------------------------- */}
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

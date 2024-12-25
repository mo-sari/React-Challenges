import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const CHALLENGE_1_FOLDER = ({ explorer }) => {
  const [data, setData] = useState(explorer);
  const [showChildren, setShowChildren] = useState(false);

  const inputRef = useRef(null);
  const [showInput, setShowInput] = useState(false);
  const [newData, setNewData] = useState("");
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setNewData("");
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addFolder = () => {
    setShowInput(true);
    setIsAddingFolder(true);
  };

  const addFile = () => {
    setShowInput(true);
    setIsAddingFolder(false);
  };

  const addItemToFolder = (data, folderId, newItem) => {
    if (data.id === folderId) {
      return {
        ...data,
        items: [...data.items, newItem],
      };
    }

    if (data.isFolder) {
      return {
        ...data,
        items: data.items.map((child) =>
          addItemToFolder(child, folderId, newItem)
        ),
      };
    }
    return data;
  };

  const handleAddingNewData = (e, id) => {
    e.preventDefault();

    const newItem = {
      isFolder: isAddingFolder,
      name: newData,
      id: uuidv4(),
      items: [],
    };

    const updatedData = addItemToFolder(data, id, newItem);
    setData(updatedData);

    setNewData("");
    setShowInput(false);
  };

  if (data.isFolder) {
    return (
      <>
        <div>
          {" "}
          <div
            style={{ display: "inline" }}
            onClick={() => setShowChildren(!showChildren)}
          >
            📁 {data.name}{" "}
          </div>
          <div style={{ display: "inline" }}>
            <button onClick={addFolder} style={{ borderRadius: "10%" }}>
              <small>Folder+</small>
            </button>
            <button onClick={addFile} style={{ borderRadius: "10%" }}>
              <small>File+</small>
            </button>{" "}
          </div>
        </div>

        <form
          onSubmit={(e) => handleAddingNewData(e, data.id)}
          style={{ display: showInput ? "inline" : "none" }}
        >
          <label htmlFor="newData" />
          <input
            type="text"
            className="text"
            name="newData"
            onChange={(e) => setNewData(e.target.value)}
            ref={inputRef}
            value={newData}
          />
        </form>

        <div style={{ display: showChildren ? "inline" : "none" }}>
          <ul>
            {data?.items?.map((d) => {
              return <CHALLENGE_1_FOLDER key={d.id} explorer={d} />;
            })}
          </ul>
        </div>
      </>
    );
  } else {
    return <div>🗄 {data.name}</div>;
  }
};

export default CHALLENGE_1_FOLDER;

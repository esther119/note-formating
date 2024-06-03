import React from "react";
import MyEditor from "../components/Editor";

const EditorPage = () => {
  const handleSave = (content) => {
    console.log("Saved Content");
    // Here you can handle the saved content, e.g., send it to a server or update your state
  };

  return (
    <div className="p-10 mx-auto max-w-5xl shadow-lg rounded-lg mb-10 bg-gray-100">
      <h1 className="text-gray-800 text-2xl">Today's Dump</h1>
      <MyEditor onSave={handleSave} />
    </div>
  );
};

export default EditorPage;

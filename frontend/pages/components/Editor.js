import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const MyEditor = ({ onSave }) => {
  const [value, setValue] = useState("");

  const handleChange = (content) => {
    setValue(content);
  };

  const handleSave = async () => {
    console.log("current content", value);
    try {
      const response = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: value }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      // Call the onSave prop with the editor content
      const noteId = result.id;
      console.log("get the note id", noteId);
      // router.push(`/notes/${noteId}`);
      window.open(`/notes/${noteId}`, "_blank");
      onSave(value);
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      // Adjust the endpoint accordingly
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, "image", data.url);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      // handlers: {
      //   image: imageHandler,
      // },
    }),
    []
  );
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        theme="snow"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSave}
      >
        Create
      </button>
    </div>
  );
};

export default MyEditor;

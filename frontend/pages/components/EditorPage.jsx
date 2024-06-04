"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteSchema, defaultStyleSpecs } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
// import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo, useState } from "react";
// import CodeBlock from "@tiptap/extension-code-block";
// import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { uploadToTempURL, uploadImageToCloud } from "../utils/cloudinaryUtils";
import { loadFromStorage, saveToStorage } from "../utils/storageUtils";
import CurrentDate from "../components/CurrentDate";

export default function EditorPage() {
  const [initialContent, setInitialContent] = useState("loading");
  const [tempURL, setTempURL] = useState(null);

  const handleFileUpload = async (file) => {
    console.log("get the file");
    const url = await uploadToTempURL(file);
    console.log("tmep url front end", url);
    setTempURL(url);
    return url; // Ensure the editor can still use the URL
  };

  const handleSave = async () => {
    try {
      console.log("current content", initialContent, "tempURL", tempURL);
      const secureURL = await uploadImageToCloud(tempURL);
      console.log("get secureURL front end", secureURL);
      // return;
      const response = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: initialContent, url: secureURL }),
      });

      if (!response.ok) {
        throw new Error(`Error in submission response: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Server response:", result);

      const noteId = result.id;
      console.log("get the note id", noteId);
      // router.push(`/notes/${noteId}`);
      window.open(`/notes/${noteId}`, "_blank");
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  // Loads the previously stored editor contents.
  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({
      initialContent: initialContent,
      uploadFile: handleFileUpload,
    });
  }, [initialContent]);
  //   const editor = useCreateBlockNote({
  //     _tiptapOptions: {
  //       extensions: [HorizontalRule, CodeBlock],
  //     },
  //     initialContent: [
  //       {
  //         type: "paragraph",
  //         props: {
  //           textColor: "default",
  //           backgroundColor: "default",
  //           textAlignment: "left",
  //         },
  //         content: [],
  //         children: [],
  //       },
  //     ],
  //   });

  if (editor === undefined) {
    return "Loading content...";
  }

  // Renders the editor instance.
  return (
    <div className="p-10 mx-auto max-w-5xl shadow-lg rounded-lg bg-white">
      <h1
        className="text-gray-500 text-3xl mb-4"
        style={{ marginLeft: "54px" }}
      >
        🕳️ <span className="ml-2" />
        Today&apos;s Dump: June 3, 2024
      </h1>
      {/* <CurrentDate /> */}

      <div>
        <BlockNoteView
          editor={editor}
          data-theming-css-demo
          theme="light"
          onChange={() => {
            saveToStorage(editor.document);
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-lato py-2 px-4 rounded mt-2"
          onClick={handleSave}
        >
          Create Note
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Link from "next/link";

const TableOfContents = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    const fetchNoteIds = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKNEND_URL}/notes`
        );
        if (response.ok) {
          const responseData = await response.json();
          console.log("get the table of content", responseData);
          setNotes(responseData);
        }
      } catch (error) {
        console.log("Error fetching note IDs", error);
      } finally {
        setIsLoading(false); // Stop loading irrespective of the result
      }
    };

    fetchNoteIds();
  }, []);

  const deleteNote = async (id) => {
    console.log("deleted note id", id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKNEND_URL}/notes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("delete note in the backend");
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } else {
        console.log("Failed to delete the note");
      }
    } catch (error) {
      console.log("Error deleting note", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        All my learnings
      </h1>
      {isLoading ? (
        <div>Loading...</div> // Simple loading text, can be replaced with a spinner
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="text-lg text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <Link href={`/notes/${note.id}`}>
                {note.topic} - {}
                <span className="text-sm">{note.creation_date}</span>
              </Link>
              <button
                onClick={() => deleteNote(note.id)}
                // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                className="bg-red-500 hover:text-red-800 text-white text-sm py-1 px-2 rounded ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <a
        href="/"
        className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
      >
        Back to Today's Dump
      </a>
    </div>
  );
};

export default TableOfContents;

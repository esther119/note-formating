import { useEffect, useState } from "react";
import Link from "next/link";

const TableOfContents = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    const fetchNoteIds = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch("http://127.0.0.1:5000/notes");
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
                {note.topic} -{" "}
                <span className="text-sm">{note.creation_date}</span>
              </Link>
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

// import { useEffect, useState } from "react";
// import Link from "next/link";

// const TableOfContents = () => {
//   const [notes, setNotes] = useState([]);
//   // const [noteIds, setNoteIds] = useState([]);

//   useEffect(() => {
//     const fetchNoteIds = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/notes");
//         if (response.ok) {
//           const responseData = await response.json();
//           console.log("responseData", responseData);
//           const ids = responseData.map((data) => data.id);
//           setNotes(responseData);
//           // setNoteIds(ids);
//         }
//       } catch (error) {
//         console.log("Error fetching note IDs", error);
//       }
//     };
//     fetchNoteIds();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-3xl font-semibold text-gray-800 mb-4">
//         All my learnings
//       </h1>
//       <ul className="space-y-2">
//         {notes.map((note) => (
//           <li
//             key={note.id}
//             className="text-lg text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
//           >
//             <Link href={`/notes/${note.id}`}>
//               {note.id} - {note.creation_date}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TableOfContents;

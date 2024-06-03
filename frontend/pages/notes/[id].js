import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Image from "next/image";

const Note = () => {
  const router = useRouter();
  const { id } = router.query;
  const [htmlContent, setHtmlContent] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [topic, setTopic] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (id) {
      const getNote = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/notes/${id}`);
          if (response.ok) {
            const responseData = await response.json();
            console.log("response data", responseData);
            const creationDate = responseData.creation_date;
            const htmlContent = marked(responseData.content);
            const topic = responseData.topic;
            const imageURL = responseData.image_url;
            console.log("topic", topic, "imageURL", imageURL);
            const safeHTML = DOMPurify.sanitize(htmlContent);
            setHtmlContent(safeHTML);
            setCreationDate(creationDate);
            setTopic(topic);
            setImageURL(imageURL);
          }
        } catch (error) {
          console.log("Error fetching note", error);
        }
      };
      getNote();
    }
  }, [id]);

  if (!htmlContent) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="mt-10 p-5 mx-auto max-w-2xl bg-white shadow-lg rounded-lg">
    <div className="mt-10 p-10 mx-auto max-w-2xl shadow-lg rounded-lg mb-10 bg-gray-100">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Image
        src={imageURL}
        alt="Note image"
        width={700} // Specify the desired width
        height={400} // Specify the desired height
        className="rounded"
      />
      <p className="text-gray-500 mt-3">Esther: {creationDate}</p>
      <a
        href="/table-of-contents"
        className="text-blue-500 hover:text-blue-700 mt-1 inline-block"
      >
        Back to all notes
      </a>
    </div>
  );
};

export default Note;

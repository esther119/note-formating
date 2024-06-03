import { marked } from "marked";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

function MarkdownPage() {
  const [content, setContent] = useState("");
  const markdownData = `
  ### Garbage collector

  - What is it? when we finish a program, we will have garbage data like the variables, objects, arrays we store.
      - Languages with garbage collector: py, js
      - Languages without garbage collector: Rust
          - Ownership: you need to have ownership system
              - Each value of memory is owned by a pointer
              - When the owner disappear, Rust will deallocate the memory when it does static analysis in compile time.
          - Borrowing: You can create a reference to the values without transferring the ownership.
  `;
  const markdownData2 = `
  ## Case switch
  
  - \`default\` is like if nothing match
  
  \`\`\`tsx
  switch(fruits) {
    case "Banana":
      alert("Hello");
      break;
    case "Apple":
      alert("Welcome");
      break;
    default:
      alert("Neither");
  }
  \`\`\`
  
  ## for loop
  
  \`\`\`tsx
  let i; 
  for (i = 0; i < 10; i++) {
    console.log(i);
  }
  \`\`\`
  
  \`\`\`tsx
  const fruits = ["Apple", "Banana", "Orange"];
  for (const x of fruits) {
    console.log(x); 
  }
  \`\`\`
  
  ## while loop
  
  \`\`\`tsx
  let j = 0;
  while (j < 10) {
    console.log(j);
    j++;
  }
  \`\`\`
  
  ## comparison
  
  \`\`\`tsx
  var age = n;
  var voteable = (age < 18) ? "Too young" : "Old enough";
  alert(voteable);
  \`\`\`
  
  ### Object.keys
  
  \`\`\`tsx
  interface Practice {
    className: string;
    hour: number;
  }
  
  const practiceObj: Record<string, Practice> = {
    typescript: { className: 'typescript', hour: 8 },
    javascript: { className: 'javascript', hour: 6 },
  };
  
  for (const x of Object.keys(practiceObj)) {
    console.log(practiceObj[x]);  
  }
  \`\`\`
  
  TODO
  
  \`\`\`tsx
  Objects.keys(eventMap).map(key => {
    // Assuming further implementation details would be here
  });
  \`\`\`
  `;
  const markdownData3 = `
  ## Map vs Object
  
  - both map and object are like python dictionaries, but map has better performance
  - Object has lots of initial functions to use, which might confuse you if you don’t want any of them.
  
  \`\`\`tsx
  const eventsMap = {}
  
  eventsMap.valueOf 
  eventsMap.toString
  eventsMap.constructor
  eventsMap.hasOwnProperty
  \`\`\`
  
  \`\`\`tsx
  const eventsMap = new Map()
  eventsMap.get('valueOf')
  // -> undefined 
  \`\`\`
  
  for (const [key, value] of eventsMap) {
  }
  `;
  const fetchAPI = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: markdownData3,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log("responseData", responseData);
      const htmlContent = marked(responseData);
      const safeHTML = DOMPurify.sanitize(htmlContent);
      setContent(safeHTML);
    } catch (error) {
      console.error("Error fetching Markdown data", error);
    }
  };

  return (
    <div>
      <button onClick={fetchAPI}>Generate note</button>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default MarkdownPage;

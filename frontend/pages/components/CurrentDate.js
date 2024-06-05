// components/CurrentDate.js
import { useState, useEffect } from "react";

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = {
      month: "short", // Short month name, e.g., "Oct"
      day: "2-digit",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div>
      <h1 className="text-gray-500 font-lato text-3xl">{currentDate}</h1>
    </div>
  );
};

export default CurrentDate;

// components/CurrentDate.js
import { useState, useEffect } from "react";

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = {
      //   weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="text-gray-500 text-xl mb-4 font-lato">{currentDate}</div>
  );
};

export default CurrentDate;

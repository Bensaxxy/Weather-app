import React, { useState } from "react";

interface WeeksDayModalProps {
  onSelect: (day: string) => void;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const WeeksDayModal: React.FC<WeeksDayModalProps> = ({ onSelect }) => {
  const [activeDay, setActiveDay] = useState<string | null>(null);

  const handleSelect = (day: string) => {
    setActiveDay(day); // mark the clicked day as active
    onSelect(day); // send it back to parent
  };

  return (
    <div className="bg-neutral-700 p-2 mt-2 w-46 md:w-50 rounded-md z-50 outline-white drop-shadow-md text-left">
      {days.map((day) => (
        <div
          key={day}
          onClick={() => handleSelect(day)}
          className={`cursor-pointer py-[5px] px-2 rounded-md shadow-2xl transition 
            ${
              activeDay === day
                ? "bg-blue-600 text-white" // active highlight
                : "hover:bg-neutral-300/10"
            }`}
        >
          <h1 className="text-sm md:text-md">{day}</h1>
        </div>
      ))}
    </div>
  );
};

export default WeeksDayModal;

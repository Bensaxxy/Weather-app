import React from "react";

interface WeeksDayModalProps {
  onSelect: (day: string) => void;
  selectedDay: string;
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

const WeeksDayModal: React.FC<WeeksDayModalProps> = ({
  onSelect,
  selectedDay,
}) => {
  return (
    <div className="bg-neutral-700 p-2 mt-2 w-46 md:w-50 rounded-md outline outline-neutral-500/30 shadow-xl text-left">
      {days.map((day) => (
        <div
          key={day}
          onClick={() => onSelect(day)}
          className={`cursor-pointer py-[6px] px-2 rounded-md shadow-2xl transition my-3 
             ${
               selectedDay === day
                 ? "bg-neutral-300/20 text-white"
                 : "hover:bg-neutral-300/10"
             }`}
        >
          <h1 className="text-sm md:text-md">{day}</h1>
          {/* {selectedDay === day && (
            <Image
              src="/images/icon-checkmark.svg"
              width={10}
              height={10}
              alt="checkmark"
            />
          )} */}
        </div>
      ))}
    </div>
  );
};

export default WeeksDayModal;

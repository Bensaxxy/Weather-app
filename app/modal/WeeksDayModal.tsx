"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WeeksDayModalProps {
  onSelect: (day: string) => void;
  selectedDay: string;
  isOpen: boolean;
  onClose: () => void;
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
  isOpen,
  onClose,
}) => {
  const [activeDay, setActiveDay] = useState<string>(selectedDay);

  useEffect(() => {
    setActiveDay(selectedDay);
  }, [selectedDay]);

  const handleSelect = (day: string) => {
    setActiveDay(day);
    onSelect(day);
    onClose(); // this tells parent to set isOpen=false
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} // 👈 plays when unmounted
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="bg-neutral-700 dark:bg-neutral-950 p-2 mt-2 w-46 md:w-50 rounded-md outline outline-neutral-500/30 shadow-xl text-left"
        >
          {days.map((day) => (
            <div
              key={day}
              onClick={() => handleSelect(day)}
              className={`cursor-pointer py-[6px] px-2 rounded-md shadow-2xl transition my-3 
                ${
                  activeDay === day
                    ? "bg-neutral-300/20 text-white"
                    : "hover:bg-neutral-300/10"
                }`}
            >
              <h1 className="text-sm md:text-md">{day}</h1>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeeksDayModal;

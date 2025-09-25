"use client";
import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";

interface VoiceSearchProps {
  setInput: (value: string) => void;
  onSelect: (value: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ setInput, onSelect }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        onSelect(transcript);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("SpeechRecognition is not supported in this browser.");
    }
  }, [setInput, onSelect]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support voice search.");
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`ml-2 relative p-2 h-10 rounded-full transition ${
        listening ? "bg-red-500" : "bg-blue-500"
      }`}
      title="Voice Search"
    >
      {listening ? <MicOff size={20} /> : <Mic size={20} />}
      {listening && (
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
      )}
    </button>
  );
};

export default VoiceSearch;

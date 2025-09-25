"use client";
import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, AlertCircle } from "lucide-react";

interface VoiceSearchProps {
  setInput: (value: string) => void;
  onSelect: (value: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ setInput, onSelect }) => {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = true; // keep listening until stopped
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setInput(transcript);
        onSelect(transcript);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSupported(false); // mark unsupported browsers
    }
  }, [setInput, onSelect]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  if (!supported) {
    return (
      <button
        type="button"
        disabled
        className="ml-2 p-2 h-10 rounded-full bg-gray-400 cursor-not-allowed flex items-center justify-center"
        title="Voice search not supported in this browser"
      >
        <AlertCircle size={20} className="text-white" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`ml-2 relative p-2 h-10 rounded-full transition cursor-pointer ${
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

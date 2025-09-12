import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const HomePage = () => {
  return (
    <div className=" px-3">
      {/* navbar component */}
      <Navbar />
      <h1
        className=" text-6xl text-center my-10"
        style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
      >
        How's the sky looking today?
      </h1>

      {/* searchbar */}
      <SearchBar />
    </div>
  );
};

export default HomePage;

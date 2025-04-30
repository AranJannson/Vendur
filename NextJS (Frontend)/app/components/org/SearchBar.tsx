"use client";

import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
      className="bg-background-300 p-4 rounded-lg shadow-md w-full placeholder:text-gray-700"
    />
  );
};

export default SearchBar;

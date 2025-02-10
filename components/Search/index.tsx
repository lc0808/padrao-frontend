"use client";

import { Saira } from "next/font/google";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useMemo, useState } from "react";
import { debounce } from "../../hooks/useDebounce";
import { useResponsivePlaceholder } from "../../hooks/useResponsivePlaceholder";

const saira = Saira({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-saira",
});

type SearchProps = {
  onSearch: (term: string) => void;
  placeholder?: string;
  mobilePlaceholder?: string;
  className?: string;
  delay?: number;
};

const SearchInput: React.FC<SearchProps> = ({
  onSearch,
  placeholder = "Buscar ...",
  mobilePlaceholder = "Buscar ...",
  className,
  delay = 500,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const placeholderText = useResponsivePlaceholder(
    placeholder,
    mobilePlaceholder
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        if (term.trim()) {
          onSearch(term);
        }
      }, delay),
    [onSearch, delay]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div
      className={`${saira.variable} font-saira  ${className} flex items-center bg-[#f3f5f5] rounded-lg p-2 px-4 w-full`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholderText}
        className="border-none outline-none w-full bg-transparent text-xs sm:text-sm text-black"
      />
      <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
    </div>
  );
};

export default SearchInput;

"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useMemo } from "react";
import { debounce } from "../../hooks/useDebounce";
import { useResponsivePlaceholder } from "../../hooks/useResponsivePlaceholder";
import { useProductContext } from "../../contexts/ProductContext";

type SearchProps = {
  placeholder?: string;
  mobilePlaceholder?: string;
  className?: string;
  delay?: number;
};

const SearchInput: React.FC<SearchProps> = ({
  placeholder = "Buscar ...",
  mobilePlaceholder = "Buscar ...",
  className,
  delay = 500,
}) => {
  const { searchTerm, setSearchTerm } = useProductContext();

  const placeholderText = useResponsivePlaceholder(
    placeholder,
    mobilePlaceholder
  );

  const debouncedSetSearch = useMemo(
    () => debounce((term: string) => setSearchTerm(term), delay),
    [setSearchTerm, delay]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetSearch(value);
  };

  return (
    <div
      className={`font-saira  ${className} flex items-center bg-[#f3f5f5] rounded-lg p-2 px-4 w-full`}
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

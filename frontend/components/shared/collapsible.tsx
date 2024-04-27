import React, { useState } from 'react';
import { FaChevronUp } from "react-icons/fa";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  hasBorder?: boolean;
}

export const Collapsible = ({ title, children, hasBorder }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`${hasBorder && 'border-b border-gray-200'}`}>
      <button
        className="w-full py-2 text-left text-gray-800 font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaChevronUp className={`inline-block mr-2 ${isOpen ? "transition transform rotate-180" : ""}`} />
        {title}
      </button>
      {isOpen && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};
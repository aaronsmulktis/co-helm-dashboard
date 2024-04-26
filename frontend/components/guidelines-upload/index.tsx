"use client";
import { toast } from 'react-toast';
import { useState } from "react";
import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa";

import { StatusText } from "../shared/loading/loading";

export default function GuidelinesUpload() {
  const { medicalRecord, guidelinesFile, setGuidelinesFile } = useDashboard();
  const [loading, setLoading] = useState<any | null>(null);

  const handleClick = () => {
    if (medicalRecord === null) {
      toast.error("Medical Record Required");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setGuidelinesFile({ url: "/assets/guidelines.pdf" });
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
      <button
        className={classNames(
          "text-white font-medium py-2 px-4 rounded border border-2",
          guidelinesFile === null ? "bg-orange-500 border-orange-500" : "border-transparent text-green-600",
          medicalRecord === null ? "cursor-not-allowed" : ""
        )}
        onClick={handleClick}
      >
        {guidelinesFile === null && (
          <StatusText
            defaultText="Simulate Guidelines Upload"
            successText="Guidelines Uploaded"
            status={loading}
          />
        )}
        {guidelinesFile !== null && (
          <span className="text-green-600 flex flex-row gap-1 items-center">
            <FaCheck />
            <span>Guidelines File Uploaded</span>
          </span>
        )}
      </button>
    </div>
  )
}
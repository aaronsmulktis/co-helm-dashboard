"use client";
import { useState } from "react";
import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa";

import { StatusText } from "@/components/shared/loading";

export default function MedicalRecordUpload() {
  const { medicalRecord, setMedicalRecord } = useDashboard();
  const [loading, setLoading] = useState<any | null>(null);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setMedicalRecord({ url: "/assets/medical-record.pdf" });
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
      <button
        className={classNames(
          "text-white font-medium py-2 px-4 rounded border border-2",
          medicalRecord === null ? "bg-blue-500 border-blue-500" : "border-transparent text-green-600"
        )}
        onClick={handleClick}
      >
        {medicalRecord === null && (
          <StatusText
            defaultText="Simulate Medical Record Upload"
            successText="Medical Record Uploaded"
            status={loading}
          />
        )}
        {medicalRecord !== null && (
          <span className="text-green-600 flex flex-row gap-1 items-center">
            <FaCheck />
            <span>Medical Record Uploaded</span>
          </span>
        )}
      </button>
    </div>
  )
}
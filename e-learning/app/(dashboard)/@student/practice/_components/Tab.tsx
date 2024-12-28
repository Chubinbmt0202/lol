import React from "react";
import Link from "next/link";

interface PracticeTabProps {
  type: string;
}

const PracticeTab = ({ type }: PracticeTabProps) => {
  const tabs = [
    { label: "All" },
    { label: "Speaking", value: "speaking" },
    { label: "Reading", value: "reading" },
    { label: "Listening", value: "listening" },
    { label: "Writing", value: "writing" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          href={tab.value ? `/practice?type=${tab.value}` : "/practice"}
          className={`border-[1px]  px-6 py-3 rounded-md ${
            type === tab.value ? "bg-blue-100  border-blue-400" : "bg-base-100"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

export default PracticeTab;

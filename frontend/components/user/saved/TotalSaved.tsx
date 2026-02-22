"use client";
import React from "react";
import { useSaved } from "@/app/_contexts/SavedContext";
const TotalSaved = () => {
  const { saved } = useSaved();

  return (
    <h3 className="md:text-lg text-sm font-normal md:font-medium">
      Total Saved: {saved.length}
    </h3>
  );
};

export default TotalSaved;

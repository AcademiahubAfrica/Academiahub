"use client";

import { loadFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { savedResearch } from "../_types/saved";

interface SavedContextType {
  saved: savedResearch[];
  addToSaved: (item: savedResearch) => void;
  removeFromSaved: (id: string | number) => void;
}

const SavedContext = createContext<SavedContextType | null>(null);

const SavedProvider = ({ children }: { children: ReactNode }) => {
  const [saved, setSaved] = useState<savedResearch[]>(() => {
    return loadFromLocalStorage<savedResearch[]>("savedResearch") || [];
  });

  // Save whenever saved[] updates
  useEffect(() => {
    saveToLocalStorage("savedResearch", saved);
  }, [saved]);

  const addToSaved = (item: savedResearch) => {
    setSaved((prev) => [...prev, item]);
  };

  const removeFromSaved = (id: number | string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SavedContext.Provider value={{ saved, addToSaved, removeFromSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export default SavedProvider;

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used inside <SavedProvider>");
  return ctx;
}

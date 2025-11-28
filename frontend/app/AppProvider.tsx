"use client";
// this component is ment to be house all contexts and provided to root layout once

import SavedProvider from "./_contexts/SavedContext";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SavedProvider>{children}</SavedProvider>
    </>
  );
};

export default AppProvider;

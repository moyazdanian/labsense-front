"use client";

import { createContext, useContext, useState } from "react";

const StageContext = createContext();

export function StageProvider({ children }) {
  const [analyseStage, setAnalyseStage] = useState("upload");

  const errorStage = () => setAnalyseStage("error");
  const successStage = () => setAnalyseStage("success");
  const uploadStage = () => setAnalyseStage("upload");

  return (
    <StageContext.Provider
      value={{ analyseStage, errorStage, successStage, uploadStage }}
    >
      {children}
    </StageContext.Provider>
  );
}

export function useStage() {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error("useStage must be whitin StageProvider");
  }

  return context;
}

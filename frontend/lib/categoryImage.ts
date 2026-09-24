const CATEGORY_IMAGES: Record<string, string> = {
  RESEARCH: "/assets/images/ResearchCards/Research.svg",
  SEMINAR: "/assets/images/ResearchCards/SeminarPaper.svg",
  PROJECT: "/assets/images/ResearchCards/FinalYearProject.svg",
  ANALYSIS: "/assets/images/ResearchCards/Analysis.svg",
};

const DEFAULT_IMAGE = "/assets/images/ResearchCards/Research.svg";

export function getCategoryImage(category: string): string {
  return CATEGORY_IMAGES[category.toUpperCase()] ?? DEFAULT_IMAGE;
}

const CATEGORY_BACKGROUND: Record<string, string> = {
  RESEARCH: "/assets/images/ResearchCards/ResearchBg.svg",
  SEMINAR: "/assets/images/ResearchCards/SeminarPaperBg.svg",
  PROJECT: "/assets/images/ResearchCards/FinalYearProjectBg.svg",
  ANALYSIS: "/assets/images/ResearchCards/AnalysisBg.svg",
};

export function getCategoryBackground(category: string): string {
  return CATEGORY_BACKGROUND[category.toUpperCase()] ?? DEFAULT_IMAGE;
}

const CATEGORY_OVERLAY: Record<string, string> = {
  RESEARCH: "/assets/images/ResearchCards/ResearchOverlay.svg",
  SEMINAR: "/assets/images/ResearchCards/SeminarPaperOverlay.svg",
  PROJECT: "/assets/images/ResearchCards/FinalYearProjectOverlay.svg",
  ANALYSIS: "/assets/images/ResearchCards/AnalysisOverlay.svg",
};
export function getCategoryOverlay(category: string): string {
  return CATEGORY_OVERLAY[category.toUpperCase()] ?? DEFAULT_IMAGE;
}
type GradientTuple = readonly [string, string];

export const CATEGORY_GRADIENTS: Record<string, GradientTuple> = {
  RESEARCH: ["#4D9949", "#B3F8AF"],
  SEMINAR: ["#3F6FA8", "#B3D4F8"],
  PROJECT: ["#B83A3A", "#FFB3B3"],
  ANALYSIS: ["#7048A8", "#D4B3F8"],
};

export const CATEGORY_LABELS: Record<string, string> = {
  RESEARCH: "RESEARCH PAPER",
  SEMINAR: "SEMINAR PAPER",
  PROJECT: "FINAL YEAR PROJECT",
  ANALYSIS: "ANALYSIS",
};

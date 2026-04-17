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

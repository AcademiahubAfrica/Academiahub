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

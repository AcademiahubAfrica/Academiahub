const CATEGORY_IMAGES: Record<string, string> = {
  RESEARCH: "/assets/images/ResearchCards/Research.png",
  SEMINAR: "/assets/images/ResearchCards/SeminarPaper.png",
  PROJECT: "/assets/images/ResearchCards/FinalYearProject.png",
  ANALYSIS: "/assets/images/ResearchCards/Analysis.png",
};

const DEFAULT_IMAGE = "/assets/images/ResearchCards/Research.png";

export function getCategoryImage(category: string): string {
  return CATEGORY_IMAGES[category.toUpperCase()] ?? DEFAULT_IMAGE;
}

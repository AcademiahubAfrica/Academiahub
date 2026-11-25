// Placeholder content for /testimonials. Replace with real entries (or an API
// fetch) once data exists; the page only depends on these shapes.

export type Testimonial = { id: number; name: string; avatar: string; rating: number; quote: string };

const temitayo = { name: "Temitayo Bakare", avatar: "/assets/images/testimonials/temitayo.jpg", rating: 4, quote: "AcademiaHub has been instrumental in my research. The quality of publications available is exceptional, and I've connected with researchers worldwide. It's truly a game-changer for academic collaboration." };
const john = { name: "John Adams", avatar: "/assets/images/testimonials/john.jpg", rating: 4, quote: "Finding relevant research has never been easier. The search functionality is powerful, and I love how I can save publications for later reference. Worth every penny of the Pro subscription!" };
const kareem = { name: "Kareem Jones", avatar: "/assets/images/testimonials/kareem.jpg", rating: 5, quote: "My favourite aspect of AcademiaHub sets it apart. I've collaborated on multiple publications and the feedback system helps improve the quality of academic work across the board." };

export const testimonials: Testimonial[] = [temitayo, temitayo, temitayo, john, john, john, kareem, kareem, kareem].map((t, i) => ({ id: i + 1, ...t }));

export const featuredTestimonial = {
  name: "Dr. Olawale Cole",
  role: "Department Head, University of Ibadan",
  quote: "AcademiaHub has transformed how we approach academic research at our institution. The platform's collaborative features and quality control have made it an indispensable tool for our entire department.",
};

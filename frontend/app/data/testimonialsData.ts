// app/data/testimonialsData.ts

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  avatar: string;
  testimonial: string;
  rating: number;
  featured?: boolean;
  initials?: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Temitayo Bakare",
    avatar: "/assets/images/testimonials/temitayo.jpg",
    testimonial: "AcademiaHub has been instrumental in my research. The quality of publications available is exceptional, and I've connected with researchers worldwide. It's truly a game-changer for academic collaboration.",
    rating: 4
  },
  {
    id: 2,
    name: "John Adams",
    avatar: "/assets/images/testimonials/john.jpg",
    testimonial: "Finding relevant research has never been easier. The search functionality is powerful, and I love how I can save publications for later reference. Worth every penny of the Pro subscription!",
    rating: 4
  },
  {
    id: 3,
    name: "Kareem Jones",
    avatar: "/assets/images/testimonials/kareem.jpg",
    testimonial: "The community aspect of AcademiaHub sets it apart. I've collaborated on multiple publications and the feedback system helps improve the quality of academic work across the board.",
    rating: 5
  },
  {
    id: 4,
    name: "Temitayo Bakare",
    avatar: "/assets/images/testimonials/temitayo.jpg",
    testimonial: "AcademiaHub has been instrumental in my research. The quality of publications available is exceptional, and I've connected with researchers worldwide. It's truly a game-changer for academic collaboration.",
    rating: 4
  },
  {
    id: 5,
    name: "John Adams",
    avatar: "/assets/images/testimonials/john.jpg",
    testimonial: "Finding relevant research has never been easier. The search functionality is powerful, and I love how I can save publications for later reference. Worth every penny of the Pro subscription!",
    rating: 4
  },
  {
    id: 6,
    name: "Kareem Jones",
    avatar: "/assets/images/testimonials/kareem.jpg",
    testimonial: "The community aspect of AcademiaHub sets it apart. I've collaborated on multiple publications and the feedback system helps improve the quality of academic work across the board.",
    rating: 5
  },
  {
    id: 7,
    name: "Temitayo Bakare",
    avatar: "/assets/images/testimonials/temitayo.jpg",
    testimonial: "AcademiaHub has been instrumental in my research. The quality of publications available is exceptional, and I've connected with researchers worldwide. It's truly a game-changer for academic collaboration.",
    rating: 4
  },
  {
    id: 8,
    name: "John Adams",
    avatar: "/assets/images/testimonials/john.jpg",
    testimonial: "Finding relevant research has never been easier. The search functionality is powerful, and I love how I can save publications for later reference. Worth every penny of the Pro subscription!",
    rating: 4
  },
  {
    id: 9,
    name: "Kareem Jones",
    avatar: "/assets/images/testimonials/kareem.jpg",
    testimonial: "The community aspect of AcademiaHub sets it apart. I've collaborated on multiple publications and the feedback system helps improve the quality of academic work across the board.",
    rating: 5
  },
  {
    id: 10,
    name: "Temitayo Bakare",
    avatar: "/assets/images/testimonials/temitayo.jpg",
    testimonial: "AcademiaHub has been instrumental in my research. The quality of publications available is exceptional, and I've connected with researchers worldwide. It's truly a game-changer for academic collaboration.",
    rating: 4
  },
  {
    id: 11,
    name: "John Adams",
    avatar: "/assets/images/testimonials/john.jpg",
    testimonial: "Finding relevant research has never been easier. The search functionality is powerful, and I love how I can save publications for later reference. Worth every penny of the Pro subscription!",
    rating: 4
  },
  {
    id: 12,
    name: "Kareem Jones",
    avatar: "/assets/images/testimonials/kareem.jpg",
    testimonial: "The community aspect of AcademiaHub sets it apart. I've collaborated on multiple publications and the feedback system helps improve the quality of academic work across the board.",
    rating: 5
  },
];
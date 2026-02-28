import { Author } from "./author";

export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  institution: string;
  year: string;
  fileUrl: string;
  fileKey: string;
  fileName: string;
  fileSize: number;
  downloads: number;
  likes: number;
  authorId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  author: Author;
}

export interface ResearchCardType {
  id: string | number;
  //   imagePath: string;
  title: string;
  author: Author;
  institution: string;
  likes: number;
  //   comments: number;
  downloads: number;
}

export interface Author {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Bio {
  institution: string;
  department: string;
  academicLevel: string;
  aboutMe: string;
  state: string;
  country: string;
}

export interface Profile extends Author {
  bio: Bio | null;
  stats: {
    uploads: number;
    downloads: number;
    likes: number;
    saves: number;
  };
}

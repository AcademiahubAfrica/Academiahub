export interface Author {
  id: string;
  name: string;
  image: string | null;
}

export interface Profile extends Author {
  bio: string | null;
  stats: {
    uploads: number;
    downloads: number;
    likes: number;
    saves: number;
  };
}

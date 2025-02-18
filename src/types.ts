export interface Post {
  id: number;
  content: string;
  created_at: string;
  photoUrl: string;
  user: {
    username: string;
  };
}
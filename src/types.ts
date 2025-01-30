export interface Post {
  id: number;
  content: string;
  created_at: string;
  user: {
    username: string;
  };
}
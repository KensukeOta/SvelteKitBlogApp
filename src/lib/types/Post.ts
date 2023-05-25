import type { User } from "./User";
import type { Like } from "./Like";

export interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
  user: User;
  likes: Like[]
}
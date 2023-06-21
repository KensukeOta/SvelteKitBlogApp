import type { User } from "./User";

export interface Comment {
  id: number;
  body: string;
  user_id: number;
  post_id: number;
  user: User;
}
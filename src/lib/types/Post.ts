import type { User } from "./User";
import type { Like } from "./Like";
import type { Tag } from "./Tag";

export interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
  user: User;
  likes: Like[];
  tags: Tag[];
}
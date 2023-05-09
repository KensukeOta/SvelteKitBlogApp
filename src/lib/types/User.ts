import type { Post } from "./Post";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  posts: Post[];
  followings: User[];
  followers: User[];
}
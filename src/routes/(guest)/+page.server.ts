import type { PageServerLoad } from "./$types";
import type { Post } from "$lib/types/Post";

export const load: PageServerLoad = (async ({ fetch, locals }) => {
  const user = locals.user;
  let res;
  let posts;

  try {
    res = await fetch(`${import.meta.env.VITE_API_URL}/v1/posts`);
    if (!res.ok) {
      const errors = await res.json();
      throw new Error(errors.message);
    }
    posts = await res.json();
  } catch (error) {
    console.log(error);
  }

  return {
    user,
    posts,
  };
})
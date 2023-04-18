import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ fetch, locals, params }) => {
  const user = locals.user
  let res;
  let post;

  try {
    res = await fetch(`${import.meta.env.VITE_API_URL}/v1/posts/${params.id}`, {
      headers: {
        "Accept": "application/json",
      },
    });
    if (!res.ok) {
      const errors = await res.json();
      throw new Error(errors.message)
    }
    post = await res.json();
  } catch (error) {
    console.log(error);
  }
  
  return {
    user,
    post,
  };
})
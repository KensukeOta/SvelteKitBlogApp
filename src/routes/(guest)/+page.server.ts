import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch, locals }) => {
  const authUser = locals.authUser;
  let res;
  let data;

  try {
    res = await fetch(`${import.meta.env.VITE_API_URL}/v1/posts`, {
      headers: {
        "Accept": "application/json",
      },
    });
    if (!res.ok) {
      const errors = await res.json();
      throw new Error(errors.message);
    }
    data = await res.json();
  } catch (error) {
    console.log(error);
  }

  return {
    authUser,
    posts: data.posts,
  };
}) satisfies PageServerLoad;
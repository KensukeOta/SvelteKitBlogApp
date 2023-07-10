import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch, locals, url }) => {
  const authUser = locals.authUser;
  const q = url.searchParams.get("q");

  let res;
  let data;

  try {
    res = await fetch(`${import.meta.env.VITE_API_URL}/v1/posts/search?q=${q}`, {
      headers: {
        "Accept": "application/json",
      },
    });
    if (!res.ok) {
      const errors = await res.json();
      throw new Error(errors.message)
    }
    data = await res.json();
  } catch (error) {
    console.log(error);
  }

  return {
    authUser,
    q,
    searchedPosts: data.posts,
  };
}) satisfies PageServerLoad;
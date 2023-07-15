import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch, locals, params }) => {
  const authUser = locals.authUser;
  const tagName = params.tagName;
  
  let res;
  let data;

  try {
    res = await fetch(`${import.meta.env.VITE_API_URL}/v1/tags/${params.tagName}`, {
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
    tagName,
    posts: data.posts,
  };
}) satisfies PageServerLoad;
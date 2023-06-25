import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ fetch, locals, params }) => {
  const authUser = locals.authUser;
  
  if (!authUser || authUser.name !== params.name) {
    throw redirect(307, "/");
  }
  
  let res;
  let data;

  try {
    res = await fetch(`${import.meta.env.VITE_API_URL}/v1/likes/${authUser.id}`, {
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
    posts: data.posts,
  };
}) satisfies PageServerLoad;
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ fetch, locals }) => {
  const authUser = locals.authUser;

  if (!authUser) {
    throw redirect(307, "/login");
  }

  let res;
  let data;

  try {
    res = await fetch(`${import.meta.env.VITE_API_URL}/v1/users/${authUser.name}/timeline`, {
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
    timelinePosts: data.timelinePosts,
  };
}) satisfies PageServerLoad;
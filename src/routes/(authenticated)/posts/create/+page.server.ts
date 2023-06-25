import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
  const authUser = locals.authUser;

  if (!authUser) {
    throw redirect(307, "/login");
  }

  return {
    authUser,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ cookies, fetch, request }) => {
    const data = await request.formData();
    let errors;
    
    const title = data.get("title");
    const body = data.get("body");
    const user_id = data.get("user_id");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/posts`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": cookies.get("XSRF-TOKEN") ?? "",
        },
        body: JSON.stringify({ title, body, user_id })
      });
      if (!res.ok) {
        errors = await res.json();
        throw new Error(errors.message);
      }
    } catch (error) {
      console.log(error);
    }

    if (errors) {
      return fail(400, { title, body, errors });
    }

    throw redirect(303, "/");
  },
} satisfies Actions;
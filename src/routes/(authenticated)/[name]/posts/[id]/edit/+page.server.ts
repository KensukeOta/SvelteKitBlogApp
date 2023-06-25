import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ fetch, locals, params }) => {
  const authUser = locals.authUser;
  let res;
  let data;

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
    data = await res.json();
  } catch (error) {
    console.log(error);
  }

  if (!authUser || authUser.id !== data.post.user_id || data.post.user.name !== params.name) {
    throw redirect(307, "/");
  }
  
  return {
    authUser,
    post: data.post,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ cookies, fetch, params, request }) => {
    const data = await request.formData();
    let errors;
    
    const title = data.get("title");
    const body = data.get("body");
    const user_id = data.get("user_id");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/posts/${params.id}`, {
        method: "PATCH",
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
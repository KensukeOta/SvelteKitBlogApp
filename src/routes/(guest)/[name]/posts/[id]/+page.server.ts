import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = (async ({ fetch, locals, params }) => {
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

  if (data.post.user.name !== params.name) {
    throw redirect(307, "/");
  }
  
  return {
    authUser,
    post: data.post,
  };
})

export const actions: Actions = {
  default: async ({ cookies, fetch, request }) => {
    const data = await request.formData();
    let errors;
    
    const body = data.get("body");
    const user_id = data.get("user_id");
    const post_id = data.get("post_id");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/comments`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": cookies.get("XSRF-TOKEN") ?? "",
        },
        body: JSON.stringify({ body, user_id, post_id })
      });
      if (!res.ok) {
        errors = await res.json();
        throw new Error(errors.message);
      }
    } catch (error) {
      console.log(error);
    }

    if (errors) {
      return fail(400, { body, errors });
    }
  },
};
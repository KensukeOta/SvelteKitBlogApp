import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = (async ({ locals }) => {
  const user = locals.user;

  if (user) {
    throw redirect(307, "/");
  }

  return {
    user,
  };
})

export const actions: Actions = {
  default: async ({ fetch, request }) => {
    const values = await request.formData();
    let errors;

    const name = values.get("name");
    const email = values.get("email");
    const password = values.get("password");
    const password_confirmation = values.get("password_confirmation");
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/users`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, password_confirmation })
      });
      if (!res.ok) {
        errors = await res.json();
        throw new Error(errors.message);
      }
    } catch (error) {
      console.log(error);
    }

    if (errors) {
      return fail(400, { name, email, errors });
    }

    throw redirect(303, "/");
  }
};
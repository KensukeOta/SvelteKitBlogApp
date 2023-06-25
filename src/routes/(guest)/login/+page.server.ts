import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
  const authUser = locals.authUser;

  if (authUser) {
    throw redirect(307, "/");
  }

  return {
    authUser,
  };
}) satisfies PageServerLoad;
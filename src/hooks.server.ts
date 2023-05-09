import type { Handle } from "@sveltejs/kit";

export const handle: Handle = (async ({ event, resolve }) => {
  try {
    if (!event.locals.user) {
      const res = await event.fetch(`${import.meta.env.VITE_API_URL}/v1/user`, {
        headers: {
          Accept: "application/json",
        }
      });
      if (!res.ok) {
        const errors = await res.json();
        throw new Error(errors.message);
      }
      event.locals.authUser = await res.json();
    }
  } catch (error) {
    console.log(error)
  }
  
  const response = await resolve(event);

  return response;
})
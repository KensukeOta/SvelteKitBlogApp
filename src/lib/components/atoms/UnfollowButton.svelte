<script lang="ts">
	import type { User } from "$lib/types/User";
  import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
  import Cookies from "js-cookie";

  let errors: any;

  export let user: User;
  
  const handleSubmit = async () => {
    const follower_id = $page.data.authUser.id;
    const followee_id = user.id;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/users/follow`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? ""
        },
        body: JSON.stringify({ follower_id, followee_id }),
        credentials: "include",
      });
      if (!res.ok) {
        errors = await res.json();
        throw new Error(errors.message);
      }
      invalidateAll();
    } catch (error) {
      console.log(error);
    }
  };
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
  <button class="inline-block bg-blue-400 border font-bold mt-6 py-1 rounded-lg text-white w-full hover:bg-blue-300">フォロー中</button>
</form>
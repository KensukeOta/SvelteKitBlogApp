<script lang="ts">
	import type { User } from "$lib/types/User";
  import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
  import Cookies from "js-cookie";

  let errors: any;

  export let user: User;
  
  const handleSubmit = async () => {
    if (!$page.data.authUser) {
      alert("ログインしていないためフォローをすることができません");
      return;
    }
    
    const follower_id = $page.data.authUser.id;
    const followee_id = user.id;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/users/follow`, {
        method: "POST",
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
  <button class="inline-block border font-bold mt-6 py-1 rounded-lg w-full hover:bg-gray-200">フォロー</button>
</form>
<script lang="ts">
	import type { Post } from "$lib/types/Post";
  import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
  import Cookies from "js-cookie";

  let errors: any;

  export let post: Post;

  const handleSubmit = async () => {
    if (!$page.data.user) {
      alert("ログインしていないので「いいね」をすることができません");
      return;
    }
    
    const user_id = $page.data.user.id;
    const post_id = post.id;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/likes`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? ""
        },
        body: JSON.stringify({ user_id, post_id }),
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

<div class="flex gap-1">
  <form method="POST" on:submit|preventDefault={handleSubmit}>
    <button><i class="bi bi-heart-fill text-gray-300"></i></button>
  </form>
  <span>{post.likes_count}</span>
</div>
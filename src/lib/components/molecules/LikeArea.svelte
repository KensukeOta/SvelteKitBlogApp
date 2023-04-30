<script lang="ts">
	import type { Post } from "$lib/types/Post";
  import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
  import Cookies from "js-cookie";

  let errors: any;

  export let post: Post;

  $: result = post.likes.findIndex((like) => like.user_id === ($page.data.user && $page.data.user.id));

  const handleSubmit = async () => {
    if (!$page.data.user) {
      alert("ログインしていないため「いいね」をすることができません");
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

<div class="flex">
  <form method="POST" on:submit|preventDefault={handleSubmit}>
    <button class={`rounded-full px-1 ${result !== -1 ? "text-red-500 hover:bg-gray-200" : "hover:text-red-500 hover:bg-pink-100"}`}>
      <i class={result !== -1 ? "bi bi-heart-fill" : "bi bi-heart"}></i>
    </button>
  </form>
  <span>{post.likes_count}</span>
</div>
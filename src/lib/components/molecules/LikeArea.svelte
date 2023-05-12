<script lang="ts">
	import type { Post } from "$lib/types/Post";
  import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
  import Cookies from "js-cookie";

  let isSubmitting = false;

  let errors: any;

  export let post: Post;

  $: result = post.likes.findIndex((like) => like.user_id === ($page.data.authUser && $page.data.authUser.id));

  const handleSubmit = async () => {
    if (!$page.data.authUser) {
      alert("ログインしていないため「いいね」をすることができません");
      return;
    }

    isSubmitting = true;
    
    const user_id = $page.data.authUser.id;
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
      await invalidateAll();
    } catch (error) {
      console.log(error);
    } finally {
      isSubmitting = false;
    }
  };
</script>

<div class="flex">
  <form method="POST" on:submit|preventDefault={handleSubmit}>
    <button 
      class={`rounded-full px-1 ${result !== -1 ? "text-red-500 hover:bg-gray-200" : "hover:text-red-500 hover:bg-pink-100"}`}
      disabled={isSubmitting}
    >
      <i class={result !== -1 ? "bi bi-heart-fill" : "bi bi-heart"}></i>
    </button>
  </form>
  <span>{post.likes.length}</span>
</div>
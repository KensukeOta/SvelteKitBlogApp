<script lang="ts">
	import type { Post } from "$lib/types/Post";
	import { invalidateAll } from "$app/navigation";
  import Cookies from "js-cookie";

  export let post: Post;

  const handleSubmit = async () => {
    if (!confirm("この記事を削除しますか？")) {
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? ""
        },
        credentials: "include",
      });
      if (!res.ok) {
        const errors = await res.json();
        throw new Error(errors.message);
      }
      invalidateAll();
    } catch (error) {
      console.log(error);
    }
  };
</script>

<form method="POST" on:submit|preventDefault={handleSubmit} class="inline-block">
  <button type="submit" class="text-red-500">削除</button>
</form>
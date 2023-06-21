<script lang="ts">
	import type { Comment } from "$lib/types/Comment";
	import { invalidateAll } from "$app/navigation";
  import Cookies from "js-cookie";

  let isSubmitting = false;

  export let comment: Comment;

  const handleSubmit = async () => {
    if (!confirm("このコメントを削除しますか？")) {
      return;
    }

    isSubmitting = true;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/comments/${comment.id}`, {
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
      await invalidateAll();
    } catch (error) {
      console.log(error);
    } finally {
      isSubmitting = false;
    }
  };
</script>

<form method="POST" on:submit|preventDefault={handleSubmit} class="inline-block">
  <button type="submit" disabled={isSubmitting} class="text-red-500">削除</button>
</form>
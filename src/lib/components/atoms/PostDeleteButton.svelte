<script lang="ts">
	import type { Post } from "$lib/types/Post";

  export let post: Post;
</script>

<form method="POST" class="inline-block">
  <button type="submit" class="text-red-500">削除</button>
</form>
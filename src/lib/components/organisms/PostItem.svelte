<script lang="ts">
	import type { Post } from "$lib/types/Post";

  export let post: Post;
</script>

<article class="border p-2">
  <h2 class="font-bold">{post.title}</h2>
  <nav class="flex justify-between">
    by {post.user.name}
  </nav>
</article>
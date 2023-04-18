<script lang="ts">
	import type { Post } from "$lib/types/Post";
	import PostEditLinkButton from "../atoms/PostEditLinkButton.svelte";

  export let post: Post;
</script>

<article class="border p-2">
  <a href={`${post.user.name}/posts/${post.id}`}>
    <h2 class="font-bold">{post.title}</h2>
  </a>
  <nav class="flex justify-between">
    by {post.user.name}
    <PostEditLinkButton {post} />
  </nav>
</article>
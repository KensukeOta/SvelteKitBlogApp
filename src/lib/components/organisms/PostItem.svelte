<script lang="ts">
	import type { Post } from "$lib/types/Post";
  import { page } from "$app/stores";
	import PostEditLinkButton from "../atoms/PostEditLinkButton.svelte";
	import PostDeleteButton from "../atoms/PostDeleteButton.svelte";

  export let post: Post;
</script>

<article class="border p-2">
  <a href={`${post.user.name}/posts/${post.id}`}>
    <h2 class="font-bold">{post.title}</h2>
  </a>
  <nav class="flex justify-between">
    by {post.user.name}
    {#if $page.data.user && $page.data.user.id === post.user_id}
      <PostEditLinkButton {post} />
      <PostDeleteButton {post} />
    {/if}
  </nav>
</article>
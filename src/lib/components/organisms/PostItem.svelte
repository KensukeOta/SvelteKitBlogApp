<script lang="ts">
	import type { Post } from "$lib/types/Post";
  import { page } from "$app/stores";
	import PostEditLinkButton from "../atoms/PostEditLinkButton.svelte";
	import PostDeleteButton from "../atoms/PostDeleteButton.svelte";
	import LikeArea from "../molecules/LikeArea.svelte";

  export let post: Post;
</script>

<article class="border p-2">
  <a href={`/${post.user.name}/posts/${post.id}`}>
    <h2 class="font-bold">{post.title}</h2>
  </a>
  <p>by {post.user.name}</p>
  <nav class="flex justify-between">
    <LikeArea {post} />
    {#if $page.data.authUser && $page.data.authUser.id === post.user_id}
      <PostEditLinkButton {post} />
      <PostDeleteButton {post} />
    {/if}
  </nav>
</article>
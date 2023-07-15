<script lang="ts">
	import type { Post } from "$lib/types/Post";
  import { page } from "$app/stores";
	import PostEditLinkButton from "../atoms/PostEditLinkButton.svelte";
	import PostDeleteButton from "../atoms/PostDeleteButton.svelte";
	import LikeArea from "../molecules/LikeArea.svelte";

  export let post: Post;
</script>

<article class="border p-2">
  <h2 class="font-bold text-xl">
    <a href={`/${post.user.name}/posts/${post.id}`} class="inline-block w-full hover:underline">
      {post.title}
    </a>
  </h2>

  <div class="mt-2">
    <i class="bi bi-tag-fill text-sm"></i>
    {#each post.tags as tag, i (tag.id) }
      <a href={`/tags/${tag.name}`} class="text-sm hover:underline">{tag.name}</a>{#if i !== post.tags.length - 1},&nbsp;{/if}
    {/each}
  </div>
  
  <p>by <a href={`/${post.user.name}`} class="hover:underline">{post.user.name}</a></p>
  <nav class="flex justify-between">
    <LikeArea {post} />
    {#if $page.data.authUser && $page.data.authUser.id === post.user_id}
      <PostEditLinkButton {post} />
      <PostDeleteButton {post} />
    {/if}
  </nav>
</article>
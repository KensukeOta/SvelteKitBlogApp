<script lang="ts">
  import type { PageData } from "./$types";
	import PostLinkButton from "$lib/components/atoms/PostLinkButton.svelte";
	import PostItem from "$lib/components/organisms/PostItem.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>SvelteKitBlogApp</title>
</svelte:head>

<p>Welcome! {data.user ? data.user.name : "stranger"}</p>

<nav class="text-center">
  <PostLinkButton />
</nav>

{#each data.posts as post (post.id)}
  <PostItem post={post} />
{/each}
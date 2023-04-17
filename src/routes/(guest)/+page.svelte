<script lang="ts">
	import PostLinkButton from "$lib/components/atoms/PostLinkButton.svelte";
import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>SvelteKitBlogApp</title>
</svelte:head>

<p>Welcome! {data.user ? data.user.name : "stranger"}</p>

<nav class="text-center">
  <PostLinkButton />
</nav>
<script lang="ts">
	import type { PageData } from "./$types";

  export let data: PageData
</script>

<svelte:head>
  <title>{data.post.title} - SvelteKitBlogApp</title>
</svelte:head>

<h1 class="font-bold">{data.post.title}</h1>

<p class="text-base whitespace-pre-line">{data.post.body}</p>


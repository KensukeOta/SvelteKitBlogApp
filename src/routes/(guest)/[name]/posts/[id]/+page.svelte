<script lang="ts">
	import type { PageData } from "./$types";
  import LikeArea from "$lib/components/molecules/LikeArea.svelte";

  export let data: PageData
</script>

<svelte:head>
  <title>{data.post.title} - SvelteKitBlogApp</title>
</svelte:head>

<h1 class="font-bold">{data.post.title}</h1>

<p class="text-base whitespace-pre-line">{data.post.body}</p>

<LikeArea post={data.post} />
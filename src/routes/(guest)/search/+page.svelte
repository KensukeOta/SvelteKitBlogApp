<script lang="ts">
	import type { PageData } from "./$types";
  import PostItem from "$lib/components/organisms/PostItem.svelte";

  export let data: PageData
</script>

<svelte:head>
  <title>「{data.q}」の検索結果 - SvelteKitBlogApp</title>
</svelte:head>

<h1 class="py-4">「<span class="font-bold">{data.q}</span>」の検索結果</h1>

<section>
  {#each data.searchedPosts as post (post.id)}
    <PostItem {post} />
  {:else}
    <p class="font-bold text-center p-2">記事が投稿されていません</p>
  {/each}
</section>
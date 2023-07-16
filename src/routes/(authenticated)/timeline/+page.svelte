<script lang="ts">
  import type { PageData } from "./$types";
	import PostItem from "$lib/components/organisms/PostItem.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>タイムライン - SvelteKitBlogApp</title>
</svelte:head>

<h1 class="font-bold py-4">フォローしているユーザーの記事</h1>

<section>
  {#each data.timelinePosts as post (post.id)}
    <PostItem {post} />
  {:else}
    <p class="font-bold text-center p-2">記事が投稿されていません</p>
  {/each}
</section>


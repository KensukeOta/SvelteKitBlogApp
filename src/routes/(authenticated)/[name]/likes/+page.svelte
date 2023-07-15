<script lang="ts">
	import type { PageData } from "./$types";
  import PostItem from "$lib/components/organisms/PostItem.svelte";

  export let data: PageData
</script>

<svelte:head>
  <title>いいねした記事一覧 - SvelteKitBlogApp</title>
</svelte:head>

<h1 class="font-bold mb-2">いいねした記事一覧</h1>

<section>
  {#each data.posts as post (post.id)}
    <PostItem {post} />
  {:else}
    <p class="font-bold text-center p-2">いいねしている記事がありません</p>
  {/each}
</section>
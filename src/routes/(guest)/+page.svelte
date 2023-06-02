<script lang="ts">
  import type { PageData } from "./$types";
  import type { Post } from "$lib/types/Post";
  import { firstPage } from "$lib/stores/firstPage";
	import PostLinkButton from "$lib/components/atoms/PostLinkButton.svelte";
	import PostItem from "$lib/components/organisms/PostItem.svelte";
	import Pagination from "$lib/components/molecules/Pagination.svelte";

  export let data: PageData;

  let perPage = 3;  // 1ページあたりの記事数
  let paginatedPosts: Post[]; // ページネーションされた記事の配列

  const changePage = (page: number) => {
    firstPage.set(page); // 現在のページ番号を更新
  };

  // 記事一覧のページングを実現するためのcomputed関数
  $: {
    const startIndex = ($firstPage - 1) * perPage; // 記事配列の開始インデックスを計算
    const endIndex = startIndex + perPage;  // 記事配列の終了インデックスを計算
    paginatedPosts = data.posts.slice(startIndex, endIndex);  // 開始インデックスから終了インデックスまでの記事を抽出
  }
</script>

<svelte:head>
  <title>SvelteKitBlogApp</title>
</svelte:head>

<p>Welcome! {data.authUser ? data.authUser.name : "stranger"}</p>

<nav class="text-center my-2">
  <PostLinkButton />
</nav>

<section>
  {#each paginatedPosts as post (post.id)}
    <PostItem {post} />
  {:else}
    <p class="font-bold text-center p-2">記事が投稿されていません</p>
  {/each}
</section>

<Pagination
  currentPage={$firstPage}
  perPage={perPage}
  totalItems={data.posts.length}
  onPageChange={changePage}
/>
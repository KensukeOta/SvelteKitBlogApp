<script lang="ts">
	import type { Post } from "$lib/types/Post";
	import PostItem from "./PostItem.svelte";

  let activeTab = "tab1";

  const setActiveTab = (tab: string) => {
    activeTab = tab;
  };

  export let posts: Post[];
  export let likes: any;
</script>

<div class="border mt-4 rounded-lg">
  <nav class="flex border-b px-4">
    <button
      class={`${activeTab === "tab1" ? "border-blue-400" : "border-transparent text-gray-400 hover:text-black"} font-bold w-1/2 py-2 px-4 text-center border-b-4 focus:outline-none`}
      on:click={() => setActiveTab('tab1')}
    >
      投稿した記事
    </button>
    <button
      class={`${activeTab === "tab2" ? "border-blue-400" : "border-transparent text-gray-400 hover:text-black"} font-bold w-1/2 py-2 px-4 text-center border-b-4 focus:outline-none`}
      on:click={() => setActiveTab('tab2')}
    >
      いいねした記事
    </button>
  </nav>

  <div>
    {#if activeTab === 'tab1'}
      <div class="bg-white overflow-hidden">
        <!-- タブ1のコンテンツ -->
        <div>
          {#each posts as post (post.id)}
            <PostItem {post} />
          {:else}
            <p class="font-bold text-center p-2">記事が投稿されていません</p>
          {/each}
        </div>
      </div>
    {:else if activeTab === 'tab2'}
      <div class="bg-white overflow-hidden">
        <!-- タブ2のコンテンツ -->
        <div>
          {#each likes as like (like.id)}
            <PostItem post={like.post} />
          {:else}
            <p class="font-bold text-center p-2">いいねしている記事がありません</p>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
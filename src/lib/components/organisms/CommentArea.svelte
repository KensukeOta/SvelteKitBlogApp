<script lang="ts">
	import CommentItem from "./CommentItem.svelte";
  import CommentMarkdownArea from "./CommentMarkdownArea.svelte";

  export let data: any;

  export let form: any;
</script>

<div class="bg-white mt-8 py-4">
  <div class="w-full">
    <p class="border-b font-bold px-8 pb-2">コメント</p>
    {#each data.post.comments as comment (comment.id)}
      <CommentItem {comment} {form} />
    {:else}
      <p class="px-8 pt-6">この記事にコメントはありません。</p>
    {/each}

    {#if !data.authUser}
      <div class="bg-gray-200 mt-4 mx-8 p-6 rounded-lg text-center">
        <p>ログインするとコメントをすることができます！</p>
        <a href="/login" class="bg-blue-400 inline-block mt-4 rounded-lg px-4 py-1 text-white hover:bg-blue-300">ログイン</a>
        <p class="mt-2">ユーザー登録をしていない方は<a href="/signup" class="text-blue-500">こちら</a>へどうぞ！</p>
      </div>
    {:else}
      <CommentMarkdownArea {data} {form} />
    {/if}
  </div>
</div>
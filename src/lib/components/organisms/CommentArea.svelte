<script lang="ts">
	import CommentMarkdownArea from "./CommentMarkdownArea.svelte";
</script>

<div class="bg-white mt-8 mb-8 py-4">
  <div class="w-full">
    <p class="border-b font-bold px-8 pb-2">コメント</p>
    <!-- ↓繰り返し処理 -->
    <section class="px-8 py-6 border-b">
      <p>asdff</p>
    </section>
    <!-- ↓記事がなかった時 -->
    <p class="px-8 pt-6">この記事にコメントはありません。</p>
    <!-- ↓テキストエリア -->
    <CommentMarkdownArea />
  </div>
</div>
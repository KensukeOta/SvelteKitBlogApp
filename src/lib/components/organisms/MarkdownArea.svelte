<script lang="ts">
  import "github-markdown-css/github-markdown.css";
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  
  export let md: any;
</script>

<div class="markdown-body flex h-[calc(100%-10.313rem)]">
  <textarea bind:value={md} name="body" id="body" placeholder="マークダウン記法で記述することができます。" class="flex-1 bg-gray-200 w-1/2 overflow-y-auto p-2" />

  <div class="flex-1 w-1/2 overflow-y-auto px-4">
    <Markdown {md} plugins={[gfmPlugin]} />
  </div>
</div>
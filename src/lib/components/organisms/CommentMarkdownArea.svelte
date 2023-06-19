<script lang="ts">
	import { enhance } from "$app/forms";
  import "github-markdown-css/github-markdown.css";
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";

  let md = "";

  let activeTab = "tab1";

  const setActiveTab = (tab: string) => {
    activeTab = tab;
  };
</script>

<div class="px-8 pt-6">
  <p class="font-bold">コメントする</p>
  <div class="border mt-2 rounded-lg">
    <div class="flex bg-gray-200">
      <button
      class={`${activeTab === "tab1" ? "bg-white" : "border-transparent text-gray-400 hover:text-black"} font-bold px-4 py-2 focus:outline-none`}
      on:click={() => setActiveTab('tab1')}
      >
        編集
      </button>
      <button
        class={`${activeTab === "tab2" ? "bg-white" : "border-transparent text-gray-400 hover:text-black"} font-bold px-4 py-2 focus:outline-none`}
        on:click={() => setActiveTab('tab2')}
      >
        プレビュー
      </button>
    </div>
  
    <div class="overflow-hidden p-2">
      <form method="POST" use:enhance>
        {#if activeTab === 'tab1'}
          <!-- タブ1のコンテンツ -->
          <textarea bind:value={md} name="body" id="body" placeholder="マークダウン記法で記述することができます。" class="border h-24 overflow-y-auto p-2 rounded-lg text-sm w-full" />
        {:else if activeTab === 'tab2'}
          <!-- タブ2のコンテンツ -->
          <div class="markdown-body h-24 overflow-y-auto p-4 min-h-[102px] w-full">
            <div class="text-sm">
              <Markdown {md} plugins={[gfmPlugin]} />
            </div>
          </div>
        {/if}
        <button type="submit" class="bg-blue-400 block border ml-auto px-4 py-1 rounded-lg text-white hover:bg-blue-300">コメントする</button>
      </form>
    </div>
  </div>

      <!-- <textarea bind:value={md} name="body" id="body" placeholder="マークダウン記法で記述することができます。" class="flex-1 bg-gray-200 w-1/2 overflow-y-auto p-2" />
    
      <div class="markdown-body flex-1 w-1/2 overflow-y-auto px-4">
        <Markdown {md} />
      </div> -->
</div>


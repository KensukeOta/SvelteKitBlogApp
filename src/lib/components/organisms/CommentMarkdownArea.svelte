<script lang="ts">
	import type { SubmitFunction } from "@sveltejs/kit";
	import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import "github-markdown-css/github-markdown.css";
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
	import Input from "../atoms/Input.svelte";

  export let data: any;

  export let form: any;

  let md = form?.body ?? "";
  
  let activeTab = "tab1";
  
  const setActiveTab = (tab: string) => {
    activeTab = tab;
  };

  const handleSubmit: SubmitFunction = ({ submitter }) => {
    submitter?.setAttribute("disabled", "true");

    return async ({ update }) => {
      await update();
      submitter?.removeAttribute("disabled");
    };
  };

  const userIdProps = {
    type: "hidden",
    name: "user_id",
    id: "user_id",
    value: `${$page.data.authUser && $page.data.authUser.id}`,
    placeholder: "",
    className: "",
  };

  const postIdProps = {
    type: "hidden",
    name: "post_id",
    id: "post_id",
    value: `${data.post.id}`,
    placeholder: "",
    className: "",
  };
</script>

<div class="px-8 pt-6">
  <p class="font-bold">コメントする</p>
  {#if form?.errors}
    <p class="text-red-500">{form.errors.message}</p>
  {/if}
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
      <form method="POST" use:enhance={handleSubmit}>
        {#if activeTab === 'tab1'}
          <!-- タブ1のコンテンツ -->
          <textarea bind:value={md} name="body" id="body" placeholder="マークダウン記法で記述することができます。" class="border h-24 overflow-y-auto p-2 rounded-lg text-sm w-full" />
          <Input {...userIdProps} />
          <Input {...postIdProps} />
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
</div>
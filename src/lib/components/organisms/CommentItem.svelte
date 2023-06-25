<script lang="ts">
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { Comment } from "$lib/types/Comment";
	import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import "github-markdown-css/github-markdown.css";
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
	import Avatar from "../atoms/Avatar.svelte";
	import Input from "../atoms/Input.svelte";
	import CommentDeleteButton from "../atoms/CommentDeleteButton.svelte";

  export let form: any;

  export let comment: Comment;

  let isUpdate = false;

  let md = form?.body ?? comment.body;

  let activeTab = "tab1";
  
  const setActiveTab = (tab: string) => {
    activeTab = tab;
  };

  const handleSubmit = (({ submitter }) => {
    submitter?.setAttribute("disabled", "true");

    return async ({ result, update }) => {
      await update();
      if (result.type === "success") {
        isUpdate = false;
      }
      submitter?.removeAttribute("disabled");
    };
  }) satisfies SubmitFunction;

  const avatarProps = {
    src: comment.user.avatar ? comment.user.avatar : "/noavatar.jpeg",
    className: "inline-block border h-8 mr-2 w-8 object-cover rounded-full"
  };

  const userIdProps = {
    type: "hidden",
    name: "user_id",
    id: "user_id",
    value: `${comment.user_id}`,
    placeholder: "",
    className: "",
  };

  const postIdProps = {
    type: "hidden",
    name: "post_id",
    id: "post_id",
    value: `${comment.post_id}`,
    placeholder: "",
    className: "",
  };

  const commentIdProps = {
    type: "hidden",
    name: "comment_id",
    id: "comment_id",
    value: `${comment.id}`,
    placeholder: "",
    className: "",
  };
</script>

<section class="px-8 py-6 border-b">
  {#if !isUpdate}
    <p class="flex justify-between">
      <a href={`/${comment.user.name}`} class="text-sm hover:underline"><Avatar {...avatarProps} />{comment.user.name}</a>
      {#if $page.data.authUser && $page.data.authUser.id === comment.user_id}
        <div class="flex flex-col text-sm">
          <button on:click={() => isUpdate = true} class="text-green-500">更新</button>
          <CommentDeleteButton {comment} />
        </div>
      {/if}
    </p>
    
    <div class="mt-4">
      <div class="markdown-body">
        <div class="text-sm">
          <Markdown md={comment.body} plugins={[gfmPlugin]} />
        </div>
      </div>
    </div>
  {:else}
    <form method="POST" action="?/editComment" use:enhance={handleSubmit}>
      <p class="font-bold">編集する</p>
      {#if form?.errors && form?.edit && comment.id == form?.comment_id}
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
          {#if activeTab === 'tab1'}
            <!-- タブ1のコンテンツ -->
            <textarea bind:value={md} name="body" id="body" placeholder="マークダウン記法で記述することができます。" class="border h-24 overflow-y-auto p-2 rounded-lg text-sm w-full" />
            <Input {...userIdProps} />
            <Input {...postIdProps} />
            <Input {...commentIdProps} />
          {:else if activeTab === 'tab2'}
            <!-- タブ2のコンテンツ -->
            <div class="markdown-body h-24 overflow-y-auto p-4 min-h-[102px] w-full">
              <div class="text-sm">
                <Markdown {md} plugins={[gfmPlugin]} />
              </div>
            </div>
          {/if}
          <div class="flex justify-end">
            <button on:click={() => {isUpdate = false; md = comment.body; form.errors.message = ""}} class="block border px-4 py-1 rounded-lg hover:bg-gray-200">キャンセル</button>
            <button type="submit" class="bg-blue-400 block border ml-2 px-4 py-1 rounded-lg text-white hover:bg-blue-300">更新する</button>
          </div>
        </div>
      </div>
    </form>
  {/if}
</section>
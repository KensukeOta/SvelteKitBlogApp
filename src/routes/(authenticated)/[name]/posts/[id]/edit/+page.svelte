<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
	import type { ActionData, PageData } from "./$types";
	import { enhance } from "$app/forms";
	import Input from "$lib/components/atoms/Input.svelte";
	import MarkdownArea from "$lib/components/organisms/MarkdownArea.svelte";

  export let data: PageData;

  export let form: ActionData;

  let md = form?.body ?? data.post.body;
  
  const handleSubmit = (({ submitter }) => {
    submitter?.setAttribute("disabled", "true");
    
    return async ({ update }) => {
      await update();
      submitter?.removeAttribute("disabled");
    };
  }) satisfies SubmitFunction;
  
  const titleProps = {
    type: "text",
    name: "title",
    id: "title",
    value: `${form?.title || data.post.title}`,
    placeholder: "記事タイトル",
    className: "block border w-full mb-2 p-2",
  };
  
  const userIdProps = {
    type: "hidden",
    name: "user_id",
    id: "user_id",
    value: `${data.post.user_id}`,
    placeholder: "",
    className: "",
  };
</script>

<svelte:head>
  <title>記事更新フォーム - SvelteKitBlogApp</title>
</svelte:head>

<form method="POST" use:enhance={handleSubmit} class="h-full pt-2">
  {#if form?.errors}
    <p class="text-red-500">{form?.errors.message}</p>
  {/if}
  <Input {...titleProps} />
  <MarkdownArea {md} />
  <Input {...userIdProps} />
  <button type="submit" class="block border bg-blue-400 rounded-3xl w-48 mx-auto text-white py-2 mt-1 hover:bg-blue-300">更新する</button>
</form>
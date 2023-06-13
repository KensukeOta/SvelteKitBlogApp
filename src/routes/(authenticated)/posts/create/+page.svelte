<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
	import type { ActionData, PageData } from "./$types";
	import { enhance } from "$app/forms";
	import TitleArea from "$lib/components/molecules/TitleArea.svelte";
	import PostArea from "$lib/components/molecules/PostArea.svelte";
	import Input from "$lib/components/atoms/Input.svelte";

  export let data: PageData;

  export let form: ActionData;

  const handleSubmit: SubmitFunction = ({ submitter }) => {
    submitter?.setAttribute("disabled", "true");

    return async ({ update }) => {
      await update();
      submitter?.removeAttribute("disabled");
    };
  };

  const titleProps = {
    type: "text",
    name: "title",
    id: "title",
    value: `${form?.title ?? ""}`,
    placeholder: "タイトル",
    className: "block border",
  };

  const postProps = {
    name: "body",
    id: "body",
    body: `${form?.body ?? ""}`,
    placeholder: "本文",
    className: "block border",
  };

  const userIdProps = {
    type: "hidden",
    name: "user_id",
    id: "user_id",
    value: `${data.authUser.id}`,
    placeholder: "",
    className: "",
  };
</script>

<svelte:head>
  <title>記事投稿フォーム - SvelteKitBlogApp</title>
</svelte:head>

<form method="POST" use:enhance={handleSubmit}>
  {#if form?.errors}
    <p class="text-red-500">{form.errors.message}</p>
  {/if}
  <TitleArea {...titleProps} />
  <PostArea {...postProps} />
  <Input {...userIdProps} />
  <button type="submit" class="border bg-blue-400 rounded-3xl w-48 text-white py-2 mt-2 hover:bg-blue-300">投稿する</button>
</form>
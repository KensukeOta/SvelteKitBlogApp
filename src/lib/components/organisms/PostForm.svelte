<script lang="ts">
	import type { User } from "$lib/types/User";
	import { enhance } from "$app/forms";
	import Input from "../atoms/Input.svelte";
	import PostArea from "../molecules/PostArea.svelte";
	import TitleArea from "../molecules/TitleArea.svelte";

  export let authUser: User;
  
  export let title: FormDataEntryValue;
  export let body: FormDataEntryValue;
  export let errors: any;

  const titleProps = {
    type: "text",
    name: "title",
    id: "title",
    value: `${title}`,
    placeholder: "タイトル",
    className: "block border",
  };

  const postProps = {
    name: "body",
    id: "body",
    body: `${body}`,
    placeholder: "本文",
    className: "block border",
  };

  const userIdProps = {
    type: "hidden",
    name: "user_id",
    id: "user_id",
    value: `${authUser.id}`,
    placeholder: "",
    className: "",
  };
</script>

<form method="POST" use:enhance>
  {#if errors}
    <p class="text-red-500">{errors.message}</p>
  {/if}
  <TitleArea {...titleProps} />
  <PostArea {...postProps} />
  <Input {...userIdProps} />
  <button type="submit" class="border bg-blue-400 rounded-3xl w-48 text-white py-2 mt-2 hover:bg-blue-300">投稿する</button>
</form>
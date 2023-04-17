<script lang="ts">
	import type { ActionData, PageData } from "./$types";
	import PostForm from "$lib/components/organisms/PostForm.svelte";

  export let data: PageData;

  export let form: ActionData;
</script>

<svelte:head>
  <title>記事投稿フォーム - SvelteKitBlogApp</title>
</svelte:head>

<PostForm title={form?.title ?? ""} body={form?.body ?? ""} errors={form?.errors ?? ""} user={data.user}  />
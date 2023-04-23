<script lang="ts">
	import type { ActionData, PageData } from "./$types";
  import PostEditForm from "$lib/components/organisms/PostEditForm.svelte";

  export let data: PageData;

  export let form: ActionData;
</script>

<svelte:head>
  <title>記事更新フォーム - SvelteKitBlogApp</title>
</svelte:head>

<PostEditForm title={form?.title ?? ""} body={form?.body ?? ""} errors={form?.errors ?? ""} post={data.post} />
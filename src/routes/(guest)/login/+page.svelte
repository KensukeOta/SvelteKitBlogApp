<script lang="ts">
  import type { ActionData } from "./$types";
	import LoginForm from "$lib/components/organisms/LoginForm.svelte";

  export let form: ActionData;
</script>

<svelte:head>
  <title>ログインフォーム - SvelteKitBlogApp</title>
</svelte:head>

<LoginForm email={form?.email ?? ""} errors={form?.errors ?? ""} />
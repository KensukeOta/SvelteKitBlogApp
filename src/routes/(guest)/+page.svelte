<script lang="ts">
	import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>SvelteKitBlogApp</title>
</svelte:head>

<p>Welcome! {data.user ? data.user.name : "stranger"}</p>
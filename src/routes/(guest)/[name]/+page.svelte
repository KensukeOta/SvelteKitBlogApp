<script lang="ts">
	import type { PageData } from "./$types";
	import ProfileBox from "$lib/components/organisms/ProfileBox.svelte";
	import TabMenu from "$lib/components/organisms/TabMenu.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.user.name} - SvelteKitBlogApp</title>
</svelte:head>

<section class="py-4">
  <ProfileBox user={data.user} />

  <TabMenu posts={data.user.posts} likes={data.user.likes} />
</section>
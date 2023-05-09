<script lang="ts">
  import type { PageData } from "./$types";
	import Avatar from "$lib/components/atoms/Avatar.svelte";

  export let data: PageData;

  const avatarProps = {
    src: data.followers.avatar ? data.followers.avatar : "/noavatar.jpeg",
    className: "inline-block border h-12 w-12 object-cover rounded-full"
  };
</script>

<svelte:head>
  <title>フォロワー - SvelteKitBlogApp</title>
</svelte:head>

<h1 class="font-bold">フォロワー</h1>

<section>
  <ul class="px-4">
    {#each data.followers as follower (follower.id) }
      <li class="py-4 border-b flex items-center gap-4">
        <Avatar {...avatarProps} />
        <a href={`/${follower.name}`} class="font-bold hover:underline">{follower.name}</a>
      </li>
    {:else}
      <p class="font-bold text-center p-2">フォロワーはいません</p>
    {/each}
  </ul>
</section>
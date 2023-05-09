<script lang="ts">
  import type { PageData } from "./$types";
	import Avatar from "$lib/components/atoms/Avatar.svelte";

  export let data: PageData;

  const avatarProps = {
    src: data.followings.avatar ? data.followings.avatar : "/noavatar.jpeg",
    className: "inline-block border h-12 w-12 object-cover rounded-full"
  };
</script>

<svelte:head>
  <title>フォローしているユーザー - SvelteKitBlogApp</title>
</svelte:head>

<h1 class="font-bold">フォローしているユーザー</h1>

<section>
  <ul class="px-4">
    {#each data.followings as following (following.id) }
      <li class="py-4 border-b flex items-center gap-4">
        <Avatar {...avatarProps} />
        <a href={`/${following.name}`} class="font-bold hover:underline">{following.name}</a>
      </li>
    {:else}
      <p class="font-bold text-center p-2">フォローしているユーザーはいません</p>
    {/each}
  </ul>
</section>
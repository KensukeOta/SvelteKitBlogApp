<script lang="ts">
  import type { PageData } from "./$types";
	import Avatar from "$lib/components/atoms/Avatar.svelte";
	import ProfileBox from "$lib/components/organisms/ProfileBox.svelte";
	import UnfollowButton from "$lib/components/atoms/UnfollowButton.svelte";
	import FollowButton from "$lib/components/atoms/FollowButton.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>フォロワー - SvelteKitBlogApp</title>
</svelte:head>

<section class="py-4">
  <ProfileBox user={data.user} />

  <section class="border mt-4">
    <h1 class="font-bold">フォロワー</h1>
    <ul class="px-4">
      {#each data.user.followers as follower (follower.id) }
        <li class="py-4 border-b flex items-center justify-between gap-4">
          <div>
            <Avatar
              src={follower.avatar ? follower.avatar : "/noavatar.jpeg"}
              className="inline-block border h-12 w-12 object-cover rounded-full"
            />
            <a href={`/${follower.name}`} class="font-bold hover:underline">{follower.name}</a>
          </div>
        </li>
      {:else}
        <p class="font-bold text-center p-2">フォローしているユーザーはいません</p>
      {/each}
    </ul>
  </section>
</section>
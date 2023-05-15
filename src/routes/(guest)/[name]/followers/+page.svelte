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
        <li class="py-4 border-b flex items-center justify-between">
          <div>
            <Avatar
              src={follower.avatar ? follower.avatar : "/noavatar.jpeg"}
              className="inline-block border h-12 w-12 object-cover rounded-full"
            />
            <a href={`/${follower.name}`} class="font-bold hover:underline">{follower.name}</a>
          </div>

          <div>
            {#if data.authUser && data.authUser.id === follower.id}
              <span></span>
            {:else if data.authUser && data.authUser.followings && data.authUser.followings.some(following => following.id === follower.id)}
              <UnfollowButton user={follower} className="inline-block bg-blue-400 border font-bold px-4 py-1 rounded-lg text-white w-full hover:bg-blue-300" />
            {:else}
              <FollowButton user={follower} className="inline-block border font-bold px-4 py-1 rounded-lg w-full hover:bg-gray-200" />
            {/if}
          </div>
        </li>
      {:else}
        <p class="font-bold text-center p-2">フォロワーはいません</p>
      {/each}
    </ul>
  </section>
</section>
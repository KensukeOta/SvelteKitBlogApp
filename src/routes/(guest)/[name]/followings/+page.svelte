<script lang="ts">
  import type { PageData } from "./$types";
	import type { User } from "$lib/types/User";
	import Avatar from "$lib/components/atoms/Avatar.svelte";
	import ProfileBox from "$lib/components/organisms/ProfileBox.svelte";
	import UnfollowButton from "$lib/components/atoms/UnfollowButton.svelte";
	import FollowButton from "$lib/components/atoms/FollowButton.svelte";

  export let data: PageData;

  const isFollowing = (followingId: number): boolean => {
    if (!data.authUser) {
      return false;
    }

    return data.authUser.followings.some((following: User) => following.id === followingId);
  };
</script>

<svelte:head>
  <title>フォローしているユーザー - SvelteKitBlogApp</title>
</svelte:head>

<section class="py-4">
  <ProfileBox user={data.user} />
  <section class="border mt-4">
    <h1 class="font-bold">フォローしているユーザー</h1>
    <ul class="px-4">
      {#each data.user.followings as following (following.id) }
        <li class="py-4 border-b flex items-center justify-between">
          <div>
            <Avatar 
              src={following.avatar ? following.avatar : "/noavatar.jpeg"} 
              className="inline-block border h-12 w-12 object-cover rounded-full"
            />
            <a href={`/${following.name}`} class="font-bold hover:underline">{following.name}</a>
          </div>

          <div>
            {#if data.authUser && data.authUser.id === following.id}
              <span></span>
            {:else if isFollowing(following.id)}
              <UnfollowButton user={following} className="inline-block bg-blue-400 border font-bold px-4 py-1 rounded-lg text-white w-full hover:bg-blue-300" />
            {:else}
              <FollowButton user={following} className="inline-block border font-bold px-4 py-1 rounded-lg w-full hover:bg-gray-200" />
            {/if}
        </div>
        </li>
      {:else}
        <p class="font-bold text-center p-2">フォローしているユーザーはいません</p>
      {/each}
    </ul>
  </section>
</section>
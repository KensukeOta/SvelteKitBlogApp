<script lang="ts">
	import type { User } from "$lib/types/User";
  import { page } from "$app/stores";
	import Avatar from "../atoms/Avatar.svelte";
	import FollowButton from "../atoms/FollowButton.svelte";
	import UnfollowButton from "../atoms/UnfollowButton.svelte";

  export let user: User;

  $: result = user.followers.findIndex((follower) => follower.id === ($page.data.authUser && $page.data.authUser.id));

  const avatarProps = {
    src: user.avatar ? user.avatar : "/noavatar.jpeg",
    className: "inline-block border h-20 w-20 object-cover rounded-full"
  };
</script>

<section class="border p-6 text-center rounded-lg">
  <Avatar {...avatarProps} />
  <h1 class="font-bold">{user.name}</h1>
  <section class="flex justify-around border-t   mt-2 pt-2">
    <a href={`/${user.name}`} class="w-1/3 hover:underline">
      <span>{user.posts.length}</span>
      <br />
      投稿
    </a>
    <a href={`/${user.name}/followings`} class="w-1/3 hover:underline">
      <span>{user.followings.length}</span>
      <br />
      フォロー
    </a>
    <a href={`/${user.name}/followers`} class="w-1/3 hover:underline">
      <span>{user.followers.length}</span>
      <br />
      フォロワー
    </a>
  </section>

  {#if result !== -1}
    <UnfollowButton {user} className="inline-block bg-blue-400 border font-bold mt-6 py-1 rounded-lg text-white w-full hover:bg-blue-300" />
  {:else if !$page.data.authUser || $page.data.authUser.id !== user.id}
    <FollowButton {user} className="inline-block border font-bold mt-6 py-1 rounded-lg w-full hover:bg-gray-200 " />
  {/if}
</section>
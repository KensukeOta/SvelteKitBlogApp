<script lang="ts">
	import type { User } from "$lib/types/User";
	import Avatar from "../atoms/Avatar.svelte";

  export let user: User;

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
</section>
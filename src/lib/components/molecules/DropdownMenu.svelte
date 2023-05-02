<script lang="ts">
  import { page } from "$app/stores";
	import LogoutButton from "../atoms/LogoutButton.svelte";
</script>

<ul class="absolute top-9 right-0 bg-white border cursor-auto py-1 rounded-md text-center w-40">
  <li><a href={`/${$page.data.user.name}/likes`}>いいねした記事</a></li>
  <hr class="my-1.5">
  <li><LogoutButton /></li>
</ul>

<style>
  ul > li:hover {
    background: rgb(96 165 250);
    color: #fff;
  }

  ul > li a {
    display: inline-block;
    width: 100%;
  }
</style>
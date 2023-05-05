<script lang="ts">
  import { page } from "$app/stores";
	import Avatar from "../atoms/Avatar.svelte";
	import DropdownMenu from "./DropdownMenu.svelte";

  let showDropdown = false;
  
  const toggleDropdown = () => {
    showDropdown = !showDropdown;
  };

  const avatarProps = {
    src: $page.data.user.avatar ? $page.data.user.avatar : "/noavatar.jpeg",
    className: "inline-block border h-8 w-8 object-cover rounded-full"
  };
</script>

<div class="inline-block relative cursor-pointer px-2 border-l hover:bg-gray-200" 
  on:mouseenter={toggleDropdown} 
  on:mouseleave={toggleDropdown}
>
  <Avatar {...avatarProps}  />
  <span class="ml-1">{$page.data.user.name}</span>
  <i class="bi bi-caret-down-fill text-xs"></i>

  {#if showDropdown}
    <DropdownMenu />
  {/if}
</div>
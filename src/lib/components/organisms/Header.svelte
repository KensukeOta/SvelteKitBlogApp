<script lang="ts">
  import { page } from "$app/stores";
  import { firstPage } from "$lib/stores/firstPage";
	import AvatarDropdownToggle from "../molecules/AvatarDropdownToggle.svelte";

  const goToTopPage = () => {
    firstPage.set(1);
  };
</script>

<header class="flex justify-between items-center border-b">
  <div class="leading-9">
    <button class="px-2 rounded-full hover:bg-gray-200">
      <i class="bi bi-list"></i>
    </button>
    <h1 class="inline-block">
      <a href="/" class="inline-block" on:click={goToTopPage}>
        <img src="/svelte-logo.svg" alt="Svelte Logo" width="24" height="24" class="inline-block" />
      </a>
    </h1>
  </div>

  <nav class="leading-9">
    <button title="検索" class="px-2">
      <i class="bi bi-search"></i>
    </button>
    {#if !$page.data.authUser}
      <a href="/signup" class="inline-block">新規登録</a>
      <a href="/login" class="inline-block">ログイン</a>
    {:else}
      <AvatarDropdownToggle />
    {/if}
  </nav>
</header>
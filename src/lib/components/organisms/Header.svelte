<script lang="ts">
  import { page } from "$app/stores";
	import LogoutButton from "../atoms/LogoutButton.svelte";
</script>

<header class="flex justify-between items-center border-b">
  <div class="leading-9">
    <button class="px-2 rounded-full hover:bg-gray-200">
      <i class="bi bi-list"></i>
    </button>
    <h1 class="inline-block">
      <a href="/" class="inline-block">
        <img src="/svelte-logo.svg" alt="Svelte Logo" width="24" height="24" class="inline-block" />
      </a>
    </h1>
  </div>

  <nav class="leading-9">
    <button title="検索">
      <i class="bi bi-search"></i>
    </button>
    {#if !$page.data.user}
      <a href="/signup" class="inline-block">新規登録</a>
      <a href="/login" class="inline-block">ログイン</a>
    {:else}
      <LogoutButton />
    {/if}
  </nav>
</header>
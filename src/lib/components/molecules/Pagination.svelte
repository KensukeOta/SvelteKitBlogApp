<script lang="ts">
  import { goto } from "$app/navigation";

  export let currentPage = 1; // 現在のページ番号
  export let perPage = 5; // 1ページあたりのアイテム数
  export let totalItems = 0;  // 総アイテム数
  export let onPageChange: (page: number) => void;  // ページ変更時のコールバック関数


  let totalPages = 0; // 総ページ数
  let pages: number[] = []; // ページ番号の配列

  const updatePagination = () => {
    totalPages = Math.ceil(totalItems / perPage); // 総ページ数を計算
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);  // ページ番号の配列を作成
  };

  const changePage = (page: number) => {
    currentPage = page; // 現在のページ番号を更新(ページ番号ボタンを更新)
    onPageChange(currentPage);  // ページ変更時のコールバック関数を呼び出す(記事を更新する)
    goto(`?page=${currentPage}`); // URLのクエリパラメータを更新してページ遷移
  };

  $: {
    totalPages = Math.ceil(totalItems / perPage);
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  $: {
    updatePagination(); // 総ページ数とページ番号の配列を更新する
  }
</script>

<nav class="flex justify-center">
  <ul class="flex">
    {#if currentPage > 1}
      <li>
        <button class="h-10 rounded w-10 hover:bg-gray-200" on:click={() => changePage(currentPage - 1)}>
          &laquo;
        </button>
      </li>
    {/if}

    {#each pages as page}
      <li>
        <button
          class={`h-10 rounded w-10 hover:bg-gray-200 ${currentPage === page && "bg-blue-400 text-white pointer-events-none"}`}
          on:click={() => changePage(page)}
        >
          {page}
        </button>
      </li>
    {/each}

    {#if currentPage < totalPages}
      <li>
        <button class="h-10 rounded w-10 hover:bg-gray-200" on:click={() => changePage(currentPage + 1)}>
          &raquo;
        </button>
      </li>
    {/if}
  </ul>
</nav>
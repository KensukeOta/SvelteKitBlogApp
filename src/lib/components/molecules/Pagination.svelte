<script lang="ts">
  import { goto } from "$app/navigation";
	import { onMount } from "svelte";

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

  const changePage = (page: number, updateUrl: boolean = true) => {
    currentPage = page; // 現在のページ番号を更新(ページ番号ボタンを更新)
    onPageChange(currentPage);  // ページ変更時のコールバック関数を呼び出す(記事を更新する)
    
    if (updateUrl) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("page", String(currentPage));
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      
      // URLの履歴を追加してページ遷移
      window.history.pushState({ page }, "", newUrl);

      // URLのクエリパラメータを更新してページ遷移
      goto(`?page=${currentPage}`, { replaceState: true });
    }
  };

  // ブラウザの「戻る」ボタンや「進む」ボタンが押されたときの処理
  const handlePopstate = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const page = pageParam ? +pageParam : 1;
    changePage(page, false); // 第2引数を追加して、URLの更新を行わないようにする
  };

  let isReady = false;

  //  2ページ以降でブラウザをリロードしても、そのページを維持するロジック
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    currentPage = pageParam ? +pageParam : 1;
    onPageChange(currentPage);

    // ブラウザの「戻る」や「進む」ボタンが押された時に発生する popstate イベントに対して、handlePopstate 関数を割り当てる
    window.addEventListener("popstate", handlePopstate);
    //  2ページ以降でブラウザをリロードした際の画面のちらつきを軽減させるロジック
    isReady = true;
  });

  //  記事を削除後、記事の数に変化があったら、リアクティブにページ番号ボタンの数が再描画されるロジック
  $: {
    totalPages = Math.ceil(totalItems / perPage);
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  $: {
    updatePagination(); // 総ページ数とページ番号の配列を更新する

    //  最後のページが1件だけのとき、その記事を削除したら、その前のページへ遷移するロジック
    if (currentPage > totalPages) {
      currentPage = totalPages;
      onPageChange(currentPage);
      goto(`?page=${currentPage}`);
    }
  }
</script>

<div class={`fixed bottom-12 w-full flex justify-center ${isReady ? "block" : "hidden"}`}>
  <nav>
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
</div>
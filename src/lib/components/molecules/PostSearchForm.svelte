<script lang="ts">

</script>

<form method="GET" action="/search">
  <div class="flex justify-center">
    <input type="text" name="q" id="q" placeholder="記事を検索" required class="block border px-2 py-1 rounded-lg rounded-r-none w-11/12" />
    <button type="submit" title="検索" class="bg-gray-100 border border-l-0 px-2 rounded-r-lg text-center hover:bg-gray-200">
      <i class="bi bi-search"></i>
    </button>
  </div>
</form>
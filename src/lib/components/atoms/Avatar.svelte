<script lang="ts">
  import { page } from "$app/stores";
</script>

<img src={$page.data.user.avatar ? $page.data.user.avatar : "/noavatar.jpeg"} alt="ユーザーのアイコン画像" width="36" height="36" class="inline-block border h-8 w-8 object-cover rounded-full" />
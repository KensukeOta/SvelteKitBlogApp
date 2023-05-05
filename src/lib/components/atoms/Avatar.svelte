<script lang="ts">
  export let src: string;
  export let className: string;
</script>

<img {src} alt="ユーザーのアイコン画像" width="36" height="36" class={className} />
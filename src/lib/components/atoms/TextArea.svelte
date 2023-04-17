<script lang="ts">
  export let name: string;
  export let id: string;
  export let body: string | number;
  export let placeholder: string;
  export let className: string;
</script>

<textarea {name} {id} {placeholder} class={className}>{body}</textarea>
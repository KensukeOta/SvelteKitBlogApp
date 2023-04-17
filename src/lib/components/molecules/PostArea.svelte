<script lang="ts">
	import Label from "../atoms/Label.svelte";
	import TextArea from "../atoms/TextArea.svelte";

  export let name: string;
  export let id: string;
  export let body: string | number;
  export let placeholder: string;
  export let className: string;

  const postProps = {
    name,
    id,
    body,
    placeholder,
    className,
  };
</script>

<Label For="body">本文</Label>
<TextArea {...postProps} />
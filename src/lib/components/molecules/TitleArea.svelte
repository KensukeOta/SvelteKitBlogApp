<script lang="ts">
  import Label from "../atoms/Label.svelte";
	import Input from "../atoms/Input.svelte";

  export let type: string;
  export let name: string;
  export let id: string;
  export let value: string | number;
  export let placeholder: string;
  export let className: string;

  const titleProps = {
    type,
    name,
    id,
    value,
    placeholder,
    className,
  };
</script>

<Label For="title">タイトル</Label>
<Input {...titleProps} />
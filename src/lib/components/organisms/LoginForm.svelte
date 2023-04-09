<script lang="ts">
	import { enhance } from "$app/forms";
	import EmailArea from "../molecules/EmailArea.svelte";
	import PasswordArea from "../molecules/PasswordArea.svelte";

  export let email: FormDataEntryValue;
  export let errors: any;

  const emailProps = {
    type: "email",
    name: "email",
    id: "email",
    value: `${email}`,
    placeholder: "メールアドレス",
    className: "block border mx-auto",
  };

  const passwordProps = {
    type: "password",
    name: "password",
    id: "password",
    value: "",
    placeholder: "パスワード",
    className: "block border mx-auto",
  };
</script>

<form method="POST" class="h-full flex items-center justify-center text-center" use:enhance>
  <fieldset class="border-2 border-blue-400 p-4 pt-2 rounded-3xl">
    <legend class="font-bold px-2">
      <h1>ログイン</h1>
    </legend>
    {#if errors}
      <p class="text-red-500">{errors.message}</p>
    {/if}
      <EmailArea {...emailProps} />
      <PasswordArea {...passwordProps} />
      <button type="submit" class="border bg-blue-400 rounded-3xl w-1/2 text-white py-2 mt-2 hover:bg-blue-300">ログイン</button>
  </fieldset>
</form>
<script lang="ts">
	import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';
	import EmailArea from "../molecules/EmailArea.svelte";
	import PasswordArea from "../molecules/PasswordArea.svelte";

  let errors: any;

  const emailProps = {
    type: "email",
    name: "email",
    id: "email",
    value: "",
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

  const handleSubmit = async (event: any) => {
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/users/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? ""
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })
      if (!res.ok) {
        errors = await res.json();
        throw new Error(errors.message);
      } else {
        goto("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<form method="POST" on:submit|preventDefault={handleSubmit} class="h-full flex items-center justify-center text-center">
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
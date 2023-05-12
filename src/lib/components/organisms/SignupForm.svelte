<script lang="ts">
	import { goto } from "$app/navigation";
  import Cookies from "js-cookie";
	import EmailArea from "../molecules/EmailArea.svelte";
  import NameArea from "../molecules/NameArea.svelte";
	import PasswordArea from "../molecules/PasswordArea.svelte";
	import PasswordConfirmArea from "../molecules/PasswordConfirmArea.svelte";

  let isSubmitting = false;

  let errors: any;

  const nameProps = {
    type: "text",
    name: "name",
    id: "name",
    value: "",
    placeholder: "名前",
    className: "block border mx-auto",
  };

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

  const passwordConfirmProps = {
    type: "password",
    name: "password_confirmation",
    id: "password_confirmation",
    value: "",
    placeholder: "パスワード確認",
    className: "block border mx-auto",
  };

  const handleSubmit = async (event: any) => {
    isSubmitting = true;
    
    const data = new FormData(event.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const password_confirmation = data.get("password_confirmation");

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/users`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? ""
        },
        body: JSON.stringify({ name, email, password, password_confirmation }),
        credentials: "include",
      });
      if (!res.ok) {
        errors = await res.json();
        throw new Error(errors.message);
      }
      await fetch(`${import.meta.env.VITE_API_URL}/v1/users/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? ""
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })
      await goto("/");
    } catch (error) {
      console.log(error);
    } finally {
      isSubmitting = false;
    }
  };
</script>

<form method="POST" on:submit|preventDefault={handleSubmit} class="h-full flex items-center justify-center text-center">
  <fieldset class="border-2 border-blue-400 p-4 pt-2 rounded-3xl">
    <legend class="font-bold px-2">
      <h1>登録</h1>
    </legend>
    {#if errors}
      <p class="text-red-500">{errors.message}</p>
    {/if}
      <NameArea {...nameProps} />
      <EmailArea {...emailProps} />
      <PasswordArea {...passwordProps} />
      <PasswordConfirmArea {...passwordConfirmProps} />
      <button type="submit" disabled={isSubmitting} class="border bg-blue-400 rounded-3xl w-1/3 text-white py-2 mt-2 hover:bg-blue-300">登録</button>
  </fieldset>
</form>
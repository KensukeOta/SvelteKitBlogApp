<script lang="ts">
  import type { InferType } from "yup";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-yup";
  import { object, string, ref } from "yup";
  import { axios } from "$lib/axios";
  import { authUser } from "$lib/stores/authUser";
  import NameArea from "$lib/components/molecules/NameArea.svelte";
  import EmailArea from "$lib/components/molecules/EmailArea.svelte";
  import PasswordArea from "$lib/components/molecules/PasswordArea.svelte";
  import PasswordConfirmArea from "$lib/components/molecules/PasswordConfirmArea.svelte";
  import SubmitButton from "$lib/components/atoms/SubmitButton.svelte";

   onMount(() => {
    if ($authUser) {
      goto("/");
    }
  });

  const schema = object({
    name: string().required("必須の項目です"),
    email: string().email("メールアドレスの形式ではありません").required("必須の項目です"),
    password: string().required("必須の項目です"),
    password_confirmation: string().required("必須の項目です").oneOf([ref('password')], 'パスワードが一致しません'),
  });

  const { form, errors, isSubmitting } = createForm<InferType<typeof schema>>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    extend: validator({ schema }),
    
    onSubmit: async (values) => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/users/create`, { name: values.name, email: values.email, password: values.password, password_confirmation: values.password_confirmation });
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email: values.email, password: values.password });
        goto("/");
        authUser.update(n => n = res.data);
      } catch (error) {
        console.log(error);
      }
    },
  });
</script>

<svelte:head>
  <title>ユーザー登録フォーム - SvelteKitBlogApp</title>
</svelte:head>

<h1 class="font-bold">ユーザー登録フォーム</h1>

<form use:form>
  <dl>
    <NameArea />
    {#if $errors.name}
    <p class="text-red-500">{$errors.name}</p>
    {/if}
    <EmailArea />
    {#if $errors.email}
    <p class="text-red-500">{$errors.email}</p>
    {/if}
    <PasswordArea />
    {#if $errors.password}
    <p class="text-red-500">{$errors.password}</p>
    {/if}
    <PasswordConfirmArea />
    {#if $errors.password_confirmation}
    <p class="text-red-500">{$errors.password_confirmation}</p>
    {/if}
    <SubmitButton disabled={$isSubmitting}>登録</SubmitButton>
  </dl>
</form>
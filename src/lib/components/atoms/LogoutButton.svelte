<script lang="ts">
	import { goto } from "$app/navigation";
  import Cookies from "js-cookie";

  let isSubmitting = false;
  
  const handleSubmit = async () => {
    isSubmitting = true;
    
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
        credentials: "include",
      });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/users/logout`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? ""
        },
        credentials: "include",
      });
      if (!res.ok) {
        const errors = await res.json();
        throw new Error(errors.message);
      }
      await goto("/login");
    } catch (error) {
      console.log(error);
    } finally {
      isSubmitting = false;
    }
  };
</script>

<form method="POST" on:submit|preventDefault={handleSubmit} class="inline-block w-full">
  <button type="submit" disabled={isSubmitting} class="w-full">ログアウト</button>
</form>
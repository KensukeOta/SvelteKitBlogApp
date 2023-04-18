<script lang="ts">
	import { goto } from "$app/navigation";
  import Cookies from "js-cookie";
  
  const handleSubmit = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
      credentials: "include",
    });
    await fetch(`${import.meta.env.VITE_API_URL}/v1/users/logout`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? ""
      },
      credentials: "include",
    })
    goto("/login");
  };
</script>

<form method="POST" on:submit|preventDefault={handleSubmit} class="inline-block">
  <button type="submit">ログアウト</button>
</form>
<script>
  import "../app.css";
  import "bootstrap-icons/font/bootstrap-icons.css";
	import Header from "$lib/components/organisms/Header.svelte";
	import Footer from "$lib/components/organisms/Footer.svelte";
</script>

<Header />

<main class="flex-1">
  <slot></slot>
</main>

<Footer />
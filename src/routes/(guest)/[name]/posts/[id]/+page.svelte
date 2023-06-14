<script lang="ts">
	import type { PageData } from "./$types";
  import "github-markdown-css/github-markdown.css";
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import Avatar from "$lib/components/atoms/Avatar.svelte";
  import LikeArea from "$lib/components/molecules/LikeArea.svelte";

  export let data: PageData;

  const avatarProps = {
    src: data.post.user.avatar ? data.post.user.avatar : "/noavatar.jpeg",
    className: "inline-block border h-8 mx-1 w-8 object-cover rounded-full"
  };
</script>

<svelte:head>
  <title>{data.post.title} - SvelteKitBlogApp</title>
</svelte:head>

<section class="p-8">
  <h1 class="font-bold text-4xl">{data.post.title}</h1>
  <p class="mt-1">by <a href={`/${data.post.user.name}`} class="hover:underline"><Avatar {...avatarProps} />{data.post.user.name}</a></p>
  
  <div class="markdown-body mt-16">
    <Markdown md={data.post.body} plugins={[gfmPlugin]} />
  </div>
</section>

<LikeArea post={data.post} />
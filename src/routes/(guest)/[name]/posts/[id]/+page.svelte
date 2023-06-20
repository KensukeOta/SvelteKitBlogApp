<script lang="ts">
	import type { ActionData, PageData } from "./$types";
  import "github-markdown-css/github-markdown.css";
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import Avatar from "$lib/components/atoms/Avatar.svelte";
  import LikeArea from "$lib/components/molecules/LikeArea.svelte";
	import CommentArea from "$lib/components/organisms/CommentArea.svelte";

  export let data: PageData;

  export let form: ActionData;

  const avatarProps = {
    src: data.post.user.avatar ? data.post.user.avatar : "/noavatar.jpeg",
    className: "inline-block border h-9 mx-1 w-9 object-cover rounded-full"
  };
</script>

<svelte:head>
  <title>{data.post.title} - SvelteKitBlogApp</title>
</svelte:head>

<div class="p-8 bg-gray-100 h-full">
  <div class="bg-white">
    <section class="p-8">
      <h1 class="font-bold text-4xl">{data.post.title}</h1>
      <p class="mt-1">
        by <a href={`/${data.post.user.name}`} class="hover:underline"><Avatar {...avatarProps} />{data.post.user.name}</a>
      </p>
      
      <div class="mt-16">
        <div class="markdown-body">
          <Markdown md={data.post.body} plugins={[gfmPlugin]} />
        </div>
      </div>
    </section>
    
    <LikeArea post={data.post} />
  </div>

  <CommentArea {data} {form} />
</div>
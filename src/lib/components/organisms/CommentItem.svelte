<script lang="ts">
	import type { Comment } from "$lib/types/Comment";
  import "github-markdown-css/github-markdown.css";
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
	import Avatar from "../atoms/Avatar.svelte";

  export let comment: Comment;

  const avatarProps = {
    src: comment.user.avatar ? comment.user.avatar : "/noavatar.jpeg",
    className: "inline-block border h-8 mr-2 w-8 object-cover rounded-full"
  };
</script>

<section class="px-8 py-6 border-b">
  <p>
    <a href={`/${comment.user.name}`} class="text-sm hover:underline"><Avatar {...avatarProps} />{comment.user.name}</a>
  </p>
  
  <div class="mt-4">
    <div class="markdown-body">
      <div class="text-sm">
        <Markdown md={comment.body} plugins={[gfmPlugin]} />
      </div>
    </div>
  </div>
</section>
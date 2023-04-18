// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import("$lib/types/User").User;
		}
		interface PageData {
			user: import("$lib/types/User").User;
			post?: import("$lib/types/Post").Post;
			posts?: import("$lib/types/Post").Post[];
		}
		// interface Platform {}
	}
}

export {};

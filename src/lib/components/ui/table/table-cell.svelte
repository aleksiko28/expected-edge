<script lang="ts">
	import type { HTMLTdAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLTdAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<td
	class={cn(
		'p-2 align-middle [&:has([role=checkbox])]:pr-0 first:sticky first:left-0 first:z-10 first:bg-zinc-900 md:first:bg-transparent',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>

<style>
	td:first-child {
		position: sticky;
		left: 0;
		z-index: 2;
	}
</style>

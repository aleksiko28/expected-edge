<script>
	import { Menu } from 'lucide-svelte';
	import { WebsiteName } from '../../config';

	let menuOpen = false;

	const toggleMenu = () => {
		menuOpen = !menuOpen;
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	};
</script>

<header class="flex py-3 bg-black text-foreground">
	<div class="flex-1 pl-3 pr-4 md:container md:mx-auto flex items-center justify-between">
		<a class="text-xl flex gap-3 items-center" href="/">
			<img class="h-10" src="/images/logo.webp" alt={WebsiteName} />
			<span class="hidden md:flex">
				{WebsiteName}
			</span>
		</a>
		<nav class="hidden md:flex gap-8">
			<a class="link link-hover" href="/expected">Expected stats</a>
			<a class="link link-hover" href="/price-changes">Price changes</a>
			<a class="link link-hover" href="/fixtures">Fixtures</a>
		</nav>

		<!-- Mobile navigation -->
		<button on:click={toggleMenu} class="md:hidden">
			<Menu />
		</button>
	</div>
</header>

<div
	class="flex transition-all fixed w-full h-full top-16 bg-background/80 backdrop-blur-sm z-50 {menuOpen
		? 'translate-x-0 opacity-100 '
		: 'translate-x-full opacity-0'}"
>
	<nav class="flex flex-col gap-4 w-full items-end p-8 text-lg">
		<a class="link link-hover" on:click={toggleMenu} href="/expected">Expected stats</a>
		<a class="link link-hover" on:click={toggleMenu} href="/price-changes">Price changes</a>
		<a class="link link-hover" on:click={toggleMenu} href="/fixtures">Fixtures</a>
	</nav>
</div>

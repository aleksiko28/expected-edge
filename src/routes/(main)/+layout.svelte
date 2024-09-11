<script>
	import { WebsiteName } from './../../config';
	import '../../app.css';
	import Header from '@/components/Header.svelte';
</script>

<Header />

<div class="bg-zinc-900 text-slate-100 p-4 md:p-8">
	<slot />
</div>

<!-- Spacer grows so the footer can be at bottom on short pages -->
<div class="flex-grow bg-zinc-900"></div>

<footer class="footer p-10 gap-x-48 lg:gap-x-64 xl:gap-x-96 place-content-center text-base">
	<nav class="flex flex-col gap-1">
		<span class="font-bold mb-2">Navigation</span>
		<a class="link link-hover mb-1" href="/expected">Expected stats</a>
		<a class="link link-hover my-1" href="/price-changes">Price changes</a>
		<a class="link link-hover my-1" href="/fixtures">Fixtures</a>
	</nav>
</footer>

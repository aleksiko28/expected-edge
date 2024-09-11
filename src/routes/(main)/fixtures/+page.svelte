<script>
	import Fixtures from './fixtures.svelte';

	export let title = 'Fixtures';
	export let description = 'Fixtures show the next matches for the Premier League.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<Fixtures></Fixtures>

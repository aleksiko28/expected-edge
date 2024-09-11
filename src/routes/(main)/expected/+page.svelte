<script>
	import Expected from './expected.svelte';

	const title = 'Expected stats';
	const description = 'Expected stats for all players in the Premier League.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<Expected></Expected>

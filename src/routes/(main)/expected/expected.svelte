<script lang="ts">
	import { onMount } from 'svelte';
	import { getTeamById } from '../../api/player-data/player-utils';
	import Table from './table.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { Player } from '@/types';
	import { fixtureData, playerData, teamData } from '@/stores';

	let data: Player[];

	onMount(async () => {
		try {
			const response = await fetch('/api/player-data');
			data = await response.json();
			data = data.map((player) => {
				const team = getTeamById(player.team) ?? '';
				return { ...player, team_name: team };
			});
			playerData.set(data);
			if (!$teamData.length) {
				const teamResponse = await fetch('/api/teams');
				const teams = await teamResponse.json();
				teamData.set(teams);
			}
			if (!$fixtureData.length) {
				const fixtureResponse = await fetch('/api/fixtures');
				const fixtures = await fixtureResponse.json();
				fixtureData.set(fixtures);
			}
			console.log('Player data fetched:', $playerData);
		} catch (error) {
			console.error('Error fetching player data:', error);
		}
	});

	const title = 'Expected stats';
	const description = 'Expected stats for all players in the Premier League.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

{#if data}
	<!-- Render the player data here -->
	<div class="flex flex-col container mx-auto">
		<h1 class="text-2xl my-4">Player expected data</h1>
		<Table {data} />
	</div>
{:else}
	<h1 class="text-2xl my-4">Player expected data</h1>
	<div class="flex flex-col gap-4 mt-8">
		{#each new Array(10) as i}
			<Skeleton id={`skeleton-${i}`} class="w-full h-6" />
		{/each}
	</div>
{/if}

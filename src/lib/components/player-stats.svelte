<script lang="ts">
	import { onMount } from 'svelte';
	import type { Player, Team } from '@/types';
	import { fixtureData, playerData, teamData } from '@/stores';
	import Badge from './badge.svelte';
	import Fdr from './fdr.svelte';

	export let playerCode = '194010';

	let data: Player | undefined;

	onMount(async () => {
		data = $playerData.find((player) => player.code === playerCode);

		const fetchFixtureData = async () => {
			const response = await fetch('/api/fixtures');
			const data = await response.json();
			fixtureData.set(data);
		};
		if (!$fixtureData.length) {
			await fetchFixtureData();
		}
	});

	function getPlayerNextFixtures(player: Player) {
		const currentGameWeek = 3;
		const nextWeeks = $fixtureData.filter(
			(fixture) =>
				fixture.event > currentGameWeek &&
				fixture.event <= currentGameWeek + 4 &&
				(fixture.team_h === player.team || fixture.team_a === player.team)
		);
		return nextWeeks;
	}

	function getPlayerBadge(homeTeamId: number, awayTeamId: number) {
		const teamId = homeTeamId === data?.team ? awayTeamId : homeTeamId;
		const teamCode = $teamData.find((team) => team.id === teamId);
		return teamCode?.code ?? 1;
	}

	function getFixtureDifficulty(team?: Team, isAway?: boolean) {
		const isForward = data?.element_type === 4 || data?.element_type === 3;
		if (team) {
			const homeDifficulty = isForward ? team.strength_defence_away : team?.strength_attack_away;
			const awayDifficulty = isForward ? team.strength_defence_home : team?.strength_attack_home;
			return isAway ? awayDifficulty : homeDifficulty;
		}
	}

	function getOpponentStrength(homeTeamId: number, awayTeamId: number) {
		const teamId = homeTeamId === data?.team ? awayTeamId : homeTeamId;
		const team = $teamData.find((team) => team.id === teamId);
		return getFixtureDifficulty(team, teamId === awayTeamId);
	}
</script>

<div class="py-4 md:py-6">
	<h3 class="text-lg font-light">Upcoming fixtures</h3>
	<div class="flex gap-2 mt-4">
		{#if data}
			{#each getPlayerNextFixtures(data) as fixture, index}
				<div
					class="flex flex-col gap-2 items-center border p-2 {index === 3
						? 'hidden md:flex'
						: 'col-span-1'}"
				>
					<Badge size="small" code={getPlayerBadge(fixture.team_h, fixture.team_a)} />
					<span>{fixture.team_h === data.team ? '(H)' : '(A)'}</span>
					<Fdr difficulty={getOpponentStrength(fixture.team_h, fixture.team_a) ?? 1000} />
				</div>
			{/each}
		{/if}
	</div>
</div>

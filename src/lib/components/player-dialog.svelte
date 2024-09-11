<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Player } from '@/types';
	import { playerData, teamData } from '../stores';
	import Photo from '../../routes/(main)/expected/photo.svelte';
	import PlayerStats from './player-stats.svelte';
	import Badge from './badge.svelte';
	import { onMount } from 'svelte';

	export let playerCode = '194010';
	let player: Player | undefined;

	$: {
		player = $playerData.find((player) => player.code === playerCode);
	}

	onMount(() => {
		if (!$teamData.length) {
			fetch('/api/teams')
				.then((res) => res.json())
				.then((data) => teamData.set(data));
		}
	});

	export let dialogOpen = false;

	export function open() {
		dialogOpen = true;
	}

	function getPlayerBadge(teamId?: number) {
		const teamCode = $teamData.find((team) => team.id === teamId);
		return teamCode?.code ?? 1;
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger />
	<Dialog.Content class="p-0 min-h-[320px] w-[95%]">
		<div class="pattern"></div>
		<Dialog.Header>
			<Dialog.Title class="flex items-center p-4 px-6 text-white font-bold relative text-xl gap-4">
				<Badge size="medium" code={getPlayerBadge(player?.team)} />
				<span>
					<p class="text-start">
						{player?.first_name}
						{player?.second_name}
					</p>
					<p class="text-lg text-muted-foreground font-medium text-start">
						{player?.team_name}
					</p>
				</span>
			</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description
			class="flex gap-4 items-end text-white relative z-10 px-4 md:px-8 justify-between"
		>
			<Photo class="w-40" code={playerCode} />
			<PlayerStats {playerCode} />
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>

<style>
	.pattern {
		background-image: url('/images/pattern.svg');
		background-size: cover;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>

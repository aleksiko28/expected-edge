<script lang="ts">
	import { readable, writable } from 'svelte/store';
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import type { Player } from '$lib/types';
	import * as Table from '$lib/components/ui/table';
	import {
		addColumnFilters,
		addPagination,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '@/components/ui/input';
	import { ArrowDown10, ArrowUp01, Clock, Info } from 'lucide-svelte';
	import * as Tooltip from '@/components/ui/tooltip';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import PlayerDialog from '@/components/player-dialog.svelte';
	import Slider from '@/components/ui/slider/slider.svelte';
	import { gameWeek } from '@/stores';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Label from '@/components/ui/label/label.svelte';
	import NumberRangeFilter from './NumberRangeFilter.svelte';

	let playerDialog: PlayerDialog;

	function removeAccents(input: string): string {
		// Normalize the string to NFKD form and remove diacritical marks (accents)
		return input.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
	}

	export let data: Player[] = [];

	const sortedByPoints = data.sort((a, b) => b.total_points - a.total_points);

	const tableData = readable(sortedByPoints);

	const filterMinutesPlayed = (range: number[], value: number) => {
		const min = range[0] === null ? 0 : range[0];
		const max = range[1] === null ? $gameWeek * 90 : range[1];
		if (min <= max) {
			return value >= min && value <= max;
		}
		return true;
	};

	const table = createTable(tableData, {
		page: addPagination({
			initialPageSize: 11
		}),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => {
				const normalizedQuery = removeAccents(filterValue).toLowerCase();
				const normalizedValue = removeAccents(value).toLowerCase();
				return normalizedValue.toLowerCase().includes(normalizedQuery.toLowerCase());
			}
		}),
		colFilter: addColumnFilters()
	});

	const columns = table.createColumns([
		table.column({
			header: 'Name',
			accessor: 'web_name'
		}),
		table.column({
			header: 'Price',
			accessor: 'now_cost',
			cell: ({ value }) => `£${value / 10}`
		}),
		table.column({
			header: 'Points',
			accessor: 'total_points'
		}),
		table.column({
			header: 'Position',
			accessor: 'element_type',
			cell: ({ value }) => {
				const positions = ['GK', 'DEF', 'MID', 'FWD'];
				return positions[value - 1];
			}
		}),
		table.column({
			header: 'xG/90',
			accessor: 'expected_goals_per_90',
			cell: ({ value }) => value.toFixed(2)
		}),
		table.column({
			header: 'xA/90',
			accessor: 'expected_assists_per_90',
			cell: ({ value }) => value.toFixed(2)
		}),
		table.column({
			header: 'xGI/90',
			accessor: 'expected_goal_involvements_per_90',
			cell: ({ value }) => value.toFixed(2)
		}),
		table.column({
			header: 'VAPM',
			accessor: 'vapm',
			cell: ({ value }) => value.toFixed(2)
		}),
		table.column({
			header: 'xPPM',
			accessor: 'xppm',
			cell: ({ value }) => value.toFixed(2)
		}),
		table.column({
			header: 'xVAPM',
			accessor: 'xvapm',
			cell: ({ value }) => value.toFixed(2)
		}),
		table.column({
			header: 'Minutes',
			accessor: 'minutes',
			plugins: {
				colFilter: {
					initialFilterValue: [0, $gameWeek * 90],
					fn: ({ filterValue, value }) => filterMinutesPlayed(filterValue, value),
					render: ({ filterValue, values }) =>
						createRender(NumberRangeFilter, { filterValue, values })
				}
			}
		})
	]);

	const positions = [
		{ value: '1', label: 'Goalkeeper' },
		{ value: '2', label: 'Defender' },
		{ value: '3', label: 'Midfielder' },
		{ value: '4', label: 'Forward' }
	];

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, rows } =
		table.createViewModel(columns);

	const { pageIndex, pageSize } = pluginStates.page;

	const { filterValue, ...rest } = pluginStates.filter;

	let positionSelect;

	let count;

	$: count = $rows.length;
	$: perPage = $pageSize;
	$: siblingCount = 1;

	/** Ensure page changes to a valid one when filtered to lower amount */
	$: {
		if (perPage * $pageIndex > count) {
			pageChange(Math.ceil(count / perPage));
		}
	}

	const pageChange = (page: number) => {
		$pageIndex = page - 1;
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const openPlayerDialog = (row: any) => {
		activePlayerCode = row.original.code;
		playerDialog.open();
	};

	let activePlayerCode = '194010';
</script>

<div class="flex items-center gap-4">
	<Input class="max-w-sm" placeholder="Filter players..." type="text" bind:value={$filterValue} />
	<Select.Root bind:this={positionSelect} portal={null}>
		<Select.Trigger class="w-[180px]">
			<Select.Value placeholder="Select a position" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Label>Position</Select.Label>
				{#each positions as position}
					<Select.Item value={position.value} label={position.label}>{position.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="favoriteFruit" />
	</Select.Root>
</div>

<Table.Root class="mt-3" {...$tableAttrs}>
	<Table.Header>
		{#each $headerRows as headerRow}
			<Subscribe rowAttrs={headerRow.attrs()}>
				<Table.Row>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe let:props attrs={cell.attrs()} let:attrs props={cell.props()}>
							<Table.Head {...attrs}>
								<button
									class="w-full text-left flex items-center gap-2"
									on:click={props.sort.toggle}
								>
									{#if props.colFilter?.render !== undefined}
										<Render of={props.colFilter.render} />
									{:else}
										<Render of={cell.render()} />
									{/if}
									{#if props.sort.order === 'asc'}
										<ArrowUp01 class="w-4 h-4" />
									{:else if props.sort.order === 'desc'}
										<ArrowDown10 class="w-4 h-4" />
									{/if}
									{#if cell.id === 'vapm'}
										<Tooltip.Root>
											<Tooltip.Trigger>
												<Info class="w-4 h-4" />
											</Tooltip.Trigger>
											<Tooltip.Content>
												<p class="max-w-[30ch] text-center">
													Value Added Per Million: A player's points per game divided by their price
													in millions.
												</p>
											</Tooltip.Content>
										</Tooltip.Root>
									{/if}
								</button>
							</Table.Head>
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Header>
	<Table.Body {...$tableBodyAttrs}>
		{#each $pageRows as row (row.id)}
			<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
				<Table.Row
					class="hover:cursor-pointer"
					on:click={() => openPlayerDialog(row)}
					{...rowAttrs}
				>
					{#each row.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs>
							{#if cell.column.id === 'web_name'}
								<Table.Cell {...attrs}>
									<p class="font-medium">
										<Render of={cell.render()} />
									</p>
								</Table.Cell>
							{:else}
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							{/if}
						</Subscribe>
					{/each}
				</Table.Row>
			</Subscribe>
		{/each}
	</Table.Body>
</Table.Root>
<div class="flex items-center justify-end space-x-4 py-4">
	<Pagination.Root onPageChange={pageChange} {count} {perPage} {siblingCount} let:pages>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton>
					<ChevronLeft class="h-4 w-4" />
					<span class="hidden sm:block">Previous</span>
				</Pagination.PrevButton>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={$pageIndex + 1 === page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton>
					<span class="hidden sm:block">Next</span>
					<ChevronRight class="h-4 w-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</div>

<PlayerDialog playerCode={activePlayerCode} bind:this={playerDialog} />

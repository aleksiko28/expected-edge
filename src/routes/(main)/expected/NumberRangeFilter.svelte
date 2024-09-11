<script lang="ts">
	import Label from '@/components/ui/label/label.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';

	import type { Readable, Writable } from 'svelte/store';
	import { Button } from '@/components/ui/button';
	import { Clock } from 'lucide-svelte';
	const isNumber = (value: any) => typeof value === 'number';

	export let filterValue: Writable<[number | null, number | null]>; //: Writable<[number | null, number | null]>;

	export let values: Readable<unknown[]>; //: Readable<unknown[]>;
	$: min = $values.length === 0 ? 0 : Math.min(...$values.filter(isNumber));
	$: max = $values.length === 0 ? 0 : Math.max(...$values.filter(isNumber));
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click|stopPropagation>
	<Popover.Root portal={null}>
		<Popover.Trigger asChild let:builder>
			<Button size="sm" builders={[builder]} variant="outline">
				<span class="flex items-center gap-2">
					Mins <Clock class="w-4 h-4" />
				</span>
			</Button>
		</Popover.Trigger>
		<Popover.Content sideOffset={8} class="w-80">
			<div class="grid gap-4">
				<div class="space-y-2">
					<h4 class="font-medium leading-none">Minutes played</h4>
					<p class="text-muted-foreground text-sm">Filter by minutes played this season.</p>
				</div>
				<div class="grid gap-2">
					<div class="grid grid-cols-3 items-center gap-4">
						<Label for="minMinutes">Min</Label>
						<Input
							id="minMinutes"
							bind:value={$filterValue[0]}
							placeholder={min.toString()}
							class="col-span-2 h-8"
						/>
					</div>
					<div class="grid grid-cols-3 items-center gap-4">
						<Label for="maxMinutes">Max</Label>
						<Input
							id="maxMinutes"
							placeholder={max.toString()}
							bind:value={$filterValue[1]}
							class="col-span-2 h-8"
						/>
					</div>
				</div>
			</div>
		</Popover.Content>
	</Popover.Root>
</div>

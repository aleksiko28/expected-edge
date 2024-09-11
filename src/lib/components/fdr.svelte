<script lang="ts">
	export let difficulty: number;
	const color = () => {
		if (difficulty <= 1100) return 'green';
		if (difficulty <= 1110) return 'yellow';
		if (difficulty <= 1200) return 'orange';
		if (difficulty <= 1300) return 'orange';
		return 'red';
	};
	const fixtureRating = () => {
		if (difficulty <= 1100) return 1;
		if (difficulty <= 1110) return 2;
		if (difficulty <= 1200) return 3;
		if (difficulty <= 1300) return 4;
		return 5;
	};
</script>

<span>
	<p class="px-4 text-black text-lg" style="background: {color()}">
		{fixtureRating()}
	</p>
</span>

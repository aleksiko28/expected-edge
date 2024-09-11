<script lang="ts">
	export let code = 1;
</script>

<!-- svelte-ignore a11y-img-redundant-alt -->
<img
	src="https://resources.premierleague.com/premierleague/badges/t{code}.png"
	alt="Photo"
	class={$$props.class}
/>

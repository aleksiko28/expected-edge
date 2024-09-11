<script lang="ts">
  export let code = "1"
</script>

<!-- svelte-ignore a11y-img-redundant-alt -->
<img
  src="https://resources.premierleague.com/premierleague/photos/players/110x140/p{code}.png"
  alt="Photo"
  class={$$props.class}
/>

<script lang="ts">
  export let code = 1
  export let size: "small" | "medium" | "large" = "medium"
  const getSize = (size: string) => {
    switch (size) {
      case "small":
        return "w-10 h-10"
      case "medium":
        return "w-12 h-12"
      case "large":
        return "w-16 h-16"
      default:
        return "w-12 h-12"
    }
  }
</script>

<!-- svelte-ignore a11y-img-redundant-alt -->
<img
  src="https://resources.premierleague.com/premierleague/badges/t{code}.png"
  alt="Photo"
  class={getSize(size)}
/>

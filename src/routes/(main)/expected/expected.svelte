<script lang="ts">
  import { onMount } from "svelte"
  import { getTeamById } from "../../api/player-data/player-utils"
  import Table from "./table.svelte"
  import { Skeleton } from "$lib/components/ui/skeleton"
  import type { Player } from "@/types"
  import { playerData } from "@/stores"

  let data: Player[]

  onMount(async () => {
    try {
      const response = await fetch("/api/player-data")
      data = await response.json()
      data = data.map((player) => {
        const team = getTeamById(player.team) ?? ""
        return { ...player, team_name: team }
      })
      playerData.set(data)
      console.log("Player data fetched:", $playerData)
    } catch (error) {
      console.error("Error fetching player data:", error)
    }
  })
</script>

{#if data}
  <!-- Render the player data here -->
  <h1 class="text-2xl my-4">Player expected data</h1>
  <Table {data} />
{:else}
  <h1 class="text-2xl my-4">Player expected data</h1>
  <div class="flex flex-col gap-4 mt-8">
    {#each new Array(10) as i}
      <Skeleton id={`skeleton-${i}`} class="w-full h-6" />
    {/each}
  </div>
{/if}
